import {  LogoutRounded, SupervisedUserCircleOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Menu } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // localStorage.removeItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    Navigate('/login');
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }}
        >
          Sample App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          {/* <Button color="inherit" component={Link} to="/users">
            My Details
          </Button>*/}
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            >
            {/* Profile */}
            <SupervisedUserCircleOutlined></SupervisedUserCircleOutlined>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem component={Link} to="/about-me" onClick={() => setAnchorEl(null)}>
              About Me
            </MenuItem>
            <MenuItem component={Link} to="/change-password" onClick={() => setAnchorEl(null)}>
              Change Password
            </MenuItem>
          </Menu>
          <Button color="inherit" component={Link} onClick={()=>handleLogout} to="/login">
            <LogoutRounded></LogoutRounded>
          </Button> 
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;