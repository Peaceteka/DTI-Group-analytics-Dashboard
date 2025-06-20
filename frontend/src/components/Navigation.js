import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="error">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DTI Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/dashboard"
            color="inherit"
            variant="text"
          >
            Dashboard
          </Button>
          <Button
            component={RouterLink}
            to="/units-management"
            color="inherit"
            variant="text"
          >
            Units Management
          </Button>
          <Button
            component={RouterLink}
            to="/finance"
            color="inherit"
            variant="text"
          >
            Finance
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
