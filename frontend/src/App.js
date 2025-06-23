import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Finance from './components/Finance/Finance';
import Navigation from './components/Navigation';
import UnitsUpload from './components/UnitsManagement/UnitsUpload';
import { ClientProvider } from './context/ClientContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#FFC107',
      light: '#FFE082',
      dark: '#FFA000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ClientProvider>
          <Navigation />
          <Routes>
            <Route path="/dashboard" element={
              <Box sx={{ mt: 8 }}>
                <Dashboard />
              </Box>
            } />
            <Route path="/finance" element={<Finance />} />
            <Route path="/units-management" element={<UnitsUpload />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </ClientProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
