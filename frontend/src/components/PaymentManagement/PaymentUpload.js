import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FileUpload as FileUploadIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed',
  borderColor: theme.palette.primary.light,
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const PaymentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      setUploadSuccess(false);

      // TODO: Implement actual file upload logic
      // For now, we'll just simulate the upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadSuccess(true);
      setPreviewOpen(true);
    } catch (error) {
      setUploadError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>Payment Data Management</Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Upload Excel file to update payment information
      </Typography>

      <StyledPaper>
        <input
          accept=".xlsx,.xls"
          style={{ display: 'none' }}
          id="payment-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="payment-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<FileUploadIcon />}
            sx={{ mb: 2 }}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Select Excel File'}
          </Button>
        </label>

        {selectedFile && !uploading && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected file: {selectedFile.name}
          </Typography>
        )}

        {uploading && (
          <CircularProgress sx={{ mt: 2 }} />
        )}

        {uploadError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {uploadError}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          sx={{ mt: 2 }}
        >
          Upload File
        </Button>
      </StyledPaper>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Payment Data Preview
          <IconButton
            aria-label="close"
            onClick={() => setPreviewOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            File: {selectedFile?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            The file has been successfully uploaded. You can now view and edit the payment data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button variant="contained" color="primary" onClick={() => setPreviewOpen(false)}>
            <CheckIcon sx={{ mr: 1 }} />
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentUpload;
