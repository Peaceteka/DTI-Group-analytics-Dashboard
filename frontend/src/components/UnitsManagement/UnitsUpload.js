import React, { useState } from 'react';
import { units } from '../../data/unitsData';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ClientForm from './ClientForm';
import { useClientContext } from '../../context/ClientContext';

const UnitsUpload = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingTeamMember, setPendingTeamMember] = useState(null);
  const [clients, setClients] = useState([]);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');


  const { registerClient } = useClientContext();

  const handleClientSubmit = (clientData) => {
    const registeredClient = registerClient({
      ...clientData,
      registeredBy: selectedTeamMember || selectedUnit?.manager,
      unit: selectedUnit?.name,
      teamMember: selectedTeamMember,
      mpesaCode: clientData.mpesaCode
    });
    setClients(prev => [...prev, registeredClient]);
  };

  const { updatePayment } = useClientContext();

  const handlePaymentUpdate = (clientId, amount) => {
    updatePayment(clientId, amount);
    setClients(prev => prev.map(client => 
      client.id === clientId ? {
        ...client,
        amountPaid: amount,
        paymentStatus: amount > 0 ? 'Paid' : 'Pending'
      } : client
    ));
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>Units Management</Typography>
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Unit</InputLabel>
          <Select
            value={selectedUnit?.name || ''}
            onChange={(e) => {
              const unit = units.find(u => u.name === e.target.value);
              setSelectedUnit(unit);
            }}
            label="Select Unit"
          >
            {units.map(unit => (
              <MenuItem key={unit.id} value={unit.name}>
                {unit.name} - Manager: {unit.manager}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedUnit && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {selectedUnit.name} Team Members:
          </Typography>
          <Dialog
            open={authDialogOpen}
            onClose={() => {
              setAuthDialogOpen(false);
              setPendingTeamMember(null);
            }}
          >
            <DialogTitle>Authenticate - {pendingTeamMember}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="PIN"
                type="password"
                fullWidth
                variant="outlined"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                error={!!error}
                helperText={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setAuthDialogOpen(false);
                setPendingTeamMember(null);
              }}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (pin === '1234') { // In a real app, this would check against the actual PIN
                    setSelectedTeamMember(pendingTeamMember);
                    setAuthDialogOpen(false);
                    setError('');
                    setPin('');
                    setPendingTeamMember(null);
                  } else {
                    setError('Invalid PIN');
                    setPin('');
                  }
                }}
                color="primary"
              >
                Authenticate
              </Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {selectedUnit.members.map(member => (
              <Button
                key={member}
                variant={selectedTeamMember === member ? 'contained' : 'outlined'}
                onClick={() => {
                  setPendingTeamMember(member);
                  setAuthDialogOpen(true);
                }}
                sx={{
                  flex: 1,
                  minWidth: 150,
                  textTransform: 'none',
                  fontWeight: selectedTeamMember === member ? 'bold' : 'normal'
                }}
              >
                {member}
              </Button>
            ))}
          </Box>

          <ClientForm
            onSubmit={handleClientSubmit}
            unitName={selectedUnit.name}
            teamMember={selectedTeamMember}
            disabled={!selectedTeamMember}
          />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Registered Clients:
            </Typography>
            {clients.map(client => (
              <Box
                key={client.id}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid #ccc',
                  borderRadius: 1
                }}
              >
                <Typography variant="subtitle1">
                  Client: {client.clientName}
                </Typography>
                <Typography variant="body2">
                  Phone: {client.phoneNumber}
                </Typography>
                <Typography variant="body2">
                  Amount Paid: ${client.amountPaid}
                </Typography>
                <Typography variant="body2">
                  Payment Status: {client.paymentStatus}
                </Typography>
                <Typography variant="body2">
                  Session Type: {client.sessionType}
                </Typography>
                <Typography variant="body2">
                  Team Member: {client.teamMember || client.registeredBy}
                </Typography>
                {client.mpesaCode && (
                  <Typography variant="body2">
                    MPESA Code: {client.mpesaCode}
                  </Typography>
                )}
                <Box sx={{ mt: 1 }}>
                  <TextField
                    type="number"
                    label="Update Payment"
                    value={client.amountPaid}
                    onChange={(e) => handlePaymentUpdate(client.id, Number(e.target.value))}
                    sx={{ maxWidth: 200 }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UnitsUpload;
