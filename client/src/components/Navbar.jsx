import {LogoutRounded,SupervisedUserCircleOutlined} from "@mui/icons-material";
import {AppBar,Toolbar,Typography,Button,Box,MenuItem,IconButton,Menu} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleTheme } from "../store/slices/themeSlice";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleLogout = () => {
    // if(localStorage.getItem("token")){
      localStorage.removeItem("token");
      window.location.reload();
      // Navigate("/");
    // }
  };
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

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
          }}
        >
          Sample Todo App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
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
            <MenuItem
              component={Link}
              to="/about-me"
              onClick={() => setAnchorEl(null)}
            >
              About Me
            </MenuItem>
            <MenuItem
              component={Link}
              to="/change-password"
              onClick={() => setAnchorEl(null)}
            >
              Change Password
            </MenuItem>
          </Menu>
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
            onClick={() => handleLogout}
            to="/"
          >
            <LogoutRounded></LogoutRounded>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
