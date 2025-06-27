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
    mpesaCode: '',
    totalAmountDue: '',
    installmentPlan: '1'
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
          label="Initial Payment"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          fullWidth
          label="Total Amount Due"
          name="totalAmountDue"
          value={formData.totalAmountDue}
          onChange={handleChange}
          required
          type="number"
          helperText="Total amount the client needs to pay"
        />
        <FormControl fullWidth>
          <InputLabel>Installment Plan</InputLabel>
          <Select
            name="installmentPlan"
            value={formData.installmentPlan}
            onChange={handleChange}
            label="Installment Plan"
          >
            <MenuItem value="1">Single Payment</MenuItem>
            <MenuItem value="2">2 Installments</MenuItem>
            <MenuItem value="3">3 Installments</MenuItem>
            <MenuItem value="4">4 Installments</MenuItem>
            <MenuItem value="5">5 Installments</MenuItem>
          </Select>
        </FormControl>
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
        <TextField
          fullWidth
          label="MPESA Code"
          name="mpesaCode"
          value={formData.mpesaCode}
          onChange={handleChange}
          placeholder="Enter MPESA transaction code"
          helperText="Enter MPESA code for payment verification"
        />
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
