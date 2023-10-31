import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';


<<<<<<< HEAD
export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
=======
export default function ButtonAppBar({user, setUser}) {
>>>>>>> 451b1f65f3502b4b3c53044cbd4f47cde6173f92

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#262626' }}>
        <Toolbar>
        {user && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
<<<<<<< HEAD

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Työtunti laskuri
          </Typography>

          <Button color="success" variant="contained">Kirjaudu sisään</Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Kuukausinäkymä</MenuItem>
            <MenuItem onClick={handleMenuClose}>Jotain</MenuItem>
            <MenuItem onClick={handleMenuClose}>Jotain</MenuItem>
          </Menu>
=======
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Työtunti laskuri
          </Typography>
          {!user && (
            <Button color="success" variant='contained' href="http://localhost:8080/login">Kirjaudu sisään</Button>
          )}
          {user && (
            <Button color="error" variant='contained' onClick={() => setUser(null)} href="http://localhost:8080/logout">Kirjaudu ulos</Button>
          )}
>>>>>>> 451b1f65f3502b4b3c53044cbd4f47cde6173f92
        </Toolbar>
      </AppBar>
    </Box>
  );
}


