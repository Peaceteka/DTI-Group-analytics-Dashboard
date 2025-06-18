import React, { useState } from 'react';
import { sessionTypes } from '../../data/unitsData';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';

const ClientForm = ({ onSubmit, unitName, teamMember }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    amountPaid: '',
    paymentStatus: 'Pending',
    sessionType: 'Physical Class',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      clientName: '',
      phoneNumber: '',
      amountPaid: '',
      paymentStatus: 'Pending',
      sessionType: 'Physical Class',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Register New Client for {unitName} - Team Member: {teamMember || 'Manager'}
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          label="Client Name"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Amount Paid"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          required
          type="number"
        />
        <FormControl fullWidth>
          <InputLabel>Payment Status</InputLabel>
          <Select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            label="Payment Status"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Partially Paid">Partially Paid</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Session Type</InputLabel>
          <Select
            name="sessionType"
            value={formData.sessionType}
            onChange={handleChange}
            label="Session Type"
          >
            {sessionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Register Client
        </Button>
      </Box>
    </Box>
  );
};

export default ClientForm;
