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
  Button,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useClientContext, ClientContextProvider } from '../../context/ClientContext';

const Finance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clients, getClientStats, verifyPayment } = useClientContext();
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

      {/* Mobile view stats */}
      {isMobile && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography>Total Amount Paid:</Typography>
              <Typography color="primary">KES {totalPaid.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography>Total Commission:</Typography>
              <Typography color="primary">KES {totalCommission.toLocaleString()}</Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Client Payments</Typography>
      {isMobile ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Client Payments</Typography>
          {clients.map((client) => (
            <Paper key={client.id} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="subtitle1">{client.clientName}</Typography>
                <Typography variant="body2">Phone: {client.phoneNumber}</Typography>
                <Typography variant="body2">Amount Paid: KES {client.amountPaid.toLocaleString()}</Typography>
                <Typography variant="body2">Total Due: KES {client.totalAmountDue.toLocaleString()}</Typography>
                <Typography variant="body2">Balance: KES {client.balance.toLocaleString()}</Typography>
                <Typography variant="body2">Installments: {client.installmentPlan}</Typography>
                <Typography variant="body2">Payment Status: {client.paymentStatus}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    label={client.paymentStatus} 
                    size="small" 
                    color={client.paymentStatus === 'Paid' ? 'success' : client.paymentStatus === 'Partial' ? 'warning' : 'default'}
                  />
                  <Button 
                    variant={client.financeVerified ? 'contained' : 'outlined'} 
                    color="success"
                    onClick={() => verifyPayment(client.id)}
                    size="small"
                  >
                    {client.financeVerified ? 'Verified' : 'Verify'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>Total Due</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Installments</TableCell>
                  <TableCell>Team Member</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>MPESA Code</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Commission</TableCell>
                  <TableCell>Finance Verified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.clientName}</TableCell>
                    <TableCell>{client.phoneNumber}</TableCell>
                    <TableCell>KES {client.amountPaid.toLocaleString()}</TableCell>
                    <TableCell>KES {client.totalAmountDue.toLocaleString()}</TableCell>
                    <TableCell>KES {client.balance.toLocaleString()}</TableCell>
                    <TableCell>{client.installmentPlan} installments</TableCell>
                    <TableCell>
                      <Chip label={client.teamMember} size="small" />
                    </TableCell>
                    <TableCell>{client.registrationDate}</TableCell>
                    <TableCell>{client.unit}</TableCell>
                    <TableCell>{client.mpesaCode || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={client.paymentStatus} 
                        size="small" 
                        color={client.paymentStatus === 'Paid' ? 'success' : client.paymentStatus === 'Partial' ? 'warning' : 'default'}
                      />
                    </TableCell>
                    <TableCell>KES {(client.amountPaid * 0.1).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant={client.financeVerified ? 'contained' : 'outlined'} 
                        color="success"
                        onClick={() => verifyPayment(client.id)}
                        size="small"
                      >
                        {client.financeVerified ? 'Verified' : 'Verify'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

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
