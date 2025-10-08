import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ height: '65px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        
        {/* Centered Title */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
          <Typography variant="h6" sx={{ fontSize: '20px' }}>
          Arthgam Urban Nidhi Limited
          </Typography>
        </Box>

        {/* User Icon */}
        <IconButton edge="end" color="inherit" onClick={handleMenuOpen} sx={{ padding: '10px' }}>
          <AccountCircleIcon />
        </IconButton>

        {/* User Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem disabled>{'user@example.com'}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
  
}

export default AdminNavbar;
