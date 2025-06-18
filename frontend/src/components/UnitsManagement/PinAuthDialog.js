import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const PinAuthDialog = ({ open, onClose, onSuccess, teamMember, unitName }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinSubmit = () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    // Verify PIN
    const isValid = pin === '1234'; // In a real app, this would check against the actual PIN
    if (isValid) {
      onSuccess();
      onClose();
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Authenticate - {teamMember}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please enter your PIN to authenticate as {teamMember} in {unitName}:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="password"
            label="PIN"
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setPin(value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            inputProps={{
              maxLength: 4,
              minLength: 4,
              style: { fontSize: '24px', textAlign: 'center' }
            }}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePinSubmit} color="primary" variant="contained">
          Authenticate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PinAuthDialog;
