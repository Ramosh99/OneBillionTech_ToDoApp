import {LogoutRounded,SupervisedUserCircleOutlined, Menu as MenuIcon} from "@mui/icons-material";
import {AppBar,Toolbar,Typography,Button,Box,MenuItem,IconButton,Menu, Drawer, List, ListItem, ListItemText} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleTheme } from "../store/slices/themeSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // if(localStorage.getItem("token")){
      localStorage.removeItem("token");
      window.location.reload();
      // Navigate("/");
    // }
  };
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const menuItems = (
    <>
      <Button color="inherit" sx={{fontWeight:'bold'}} component={Link} to="/dashboard">
        <span style={{ color: '#c42cff' }}>Dash </span>board
      </Button>
      <Button
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <SupervisedUserCircleOutlined />
      </Button>
    </>
  );

  const drawer = (
    <List>
      <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/about-me" onClick={handleDrawerToggle}>
        <ListItemText primary="About Me" />
      </ListItem>
      <ListItem button component={Link} to="/change-password" onClick={handleDrawerToggle}>
        <ListItemText primary="Change Password" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            marginLeft: "20px",
            fontWeight: "bold",
          }}
        >
          <span style={{ color: '#c42cff' }}>Todo</span>App
        </Typography>
        
        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {menuItems}
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleTheme())}
            sx={{ ml: 1 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            onClick={handleLogout}
            to="/"
          >
            <LogoutRounded />
          </Button>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Original Menu for desktop */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/about-me"
            onClick={() => setAnchorEl(null)}
            sx={{fontWeight: 'bold'}}
          >
            <span style={{ color: '#c42cff' }}>About </span> Me
          </MenuItem>
          <MenuItem
            component={Link}
            to="/change-password"
            onClick={() => setAnchorEl(null)}
            sx={{fontWeight: 'bold'}}
          >
            <span style={{ color: '#c42cff' }}>Change </span> Password
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
