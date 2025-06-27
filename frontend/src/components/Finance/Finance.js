import React from 'react';
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
import { useClientContext } from '../../context/ClientContext';

const Finance = () => {
  const { clients, getClientStats } = useClientContext();
  const stats = getClientStats();

  // Calculate total amounts using context
  const totalPaid = stats.totalPaid;
  const totalCommission = stats.totalCommission;

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
              <TableCell>MPESA Code</TableCell>
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
                <TableCell>{client.mpesaCode || 'N/A'}</TableCell>
                <TableCell>KES {(client.amountPaid * 0.1).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Team Member Performance</Typography>
      <Grid container spacing={3}>
        {Object.entries(stats.teamMemberStats).map(([member, stats]) => (
          <Grid item xs={12} sm={6} md={3} key={member}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>{member}</Typography>
              <Typography variant="body1">
                Total Commission: KES {stats.totalCommission.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Clients: {stats.clients}
              </Typography>
              <Typography variant="body1">
                Total Amount: KES {stats.totalAmount.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Finance;
