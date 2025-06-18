import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Chip,
} from '@mui/material';
import { units } from '../../data/unitsData';

const Finance = () => {
  const [clients, setClients] = useState([]);

  // Simulating fetching clients data from units management
  useEffect(() => {
    // In a real app, this would fetch from a backend API
    const demoClients = [
      {
        id: 1,
        clientName: 'John Doe',
        phoneNumber: '+254723456789',
        amountPaid: 5000,
        paymentStatus: 'Paid',
        teamMember: 'Brian',
        registrationDate: '2025-06-18',
        unit: 'Unit 1'
      },
      {
        id: 2,
        clientName: 'Jane Smith',
        phoneNumber: '+254712345678',
        amountPaid: 3000,
        paymentStatus: 'Paid',
        teamMember: 'Rose',
        registrationDate: '2025-06-18',
        unit: 'Unit 1'
      },
      // Add more demo clients as needed
    ];
    setClients(demoClients);
  }, []);

  // Calculate total amounts
  const totalPaid = clients.reduce((sum, client) => sum + (client.amountPaid || 0), 0);
  const totalCommission = totalPaid * 0.1; // 10% commission

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Finance Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Total Amount Paid</Typography>
            <Typography variant="h4" color="primary">KES {totalPaid.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Total Commission (10%)</Typography>
            <Typography variant="h4" color="primary">KES {totalCommission.toLocaleString()}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Client Payments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Team Member</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Commission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.clientName}</TableCell>
                <TableCell>{client.phoneNumber}</TableCell>
                <TableCell>KES {client.amountPaid.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip label={client.teamMember} size="small" />
                </TableCell>
                <TableCell>{client.registrationDate}</TableCell>
                <TableCell>{client.unit}</TableCell>
                <TableCell>KES {(client.amountPaid * 0.1).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Team Member Performance</Typography>
      <Grid container spacing={3}>
        {units.reduce((acc, unit) => [...acc, ...unit.members], []).map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>{member}</Typography>
              <Typography variant="body1">
                Total Commission: KES {clients
                  .filter(c => c.teamMember === member)
                  .reduce((sum, c) => sum + (c.amountPaid * 0.1), 0)
                  .toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Clients: {clients.filter(c => c.teamMember === member).length}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Finance;
