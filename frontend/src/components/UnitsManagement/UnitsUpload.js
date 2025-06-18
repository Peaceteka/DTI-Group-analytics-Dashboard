import React, { useState } from 'react';
import { units } from '../../data/unitsData';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ClientForm from './ClientForm';

const UnitsUpload = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const handleClientSubmit = (clientData) => {
    setClients((prev) => [...prev, {
      ...clientData,
      id: Date.now(),
      registeredBy: selectedTeamMember || selectedUnit?.manager,
      unit: selectedUnit?.name,
      teamMember: selectedTeamMember,
      registrationDate: new Date().toISOString().split('T')[0]
    }]);
  };

  const handlePaymentUpdate = (clientId, amount) => {
    setClients((prev) => prev.map(client => 
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
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {selectedUnit.members.map(member => (
              <Button
                key={member}
                variant={selectedTeamMember === member ? 'contained' : 'outlined'}
                onClick={() => setSelectedTeamMember(member)}
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
                <Box sx={{ mt: 1 }}>
                  <TextField
                    type="number"
                    label="Update Payment"
                    onChange={(e) => handlePaymentUpdate(client.id, e.target.value)}
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
