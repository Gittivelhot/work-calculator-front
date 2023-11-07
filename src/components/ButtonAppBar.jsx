import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import MenuDrawer from './Drawer';

export default function ButtonAppBar({user, setUser}) {

  const [open, setOpen] = useState(false);

  function logout() {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
    })
    .then(response => {
      if(!response.ok){
        throw new Error("Response was not okay")
      }
      return response.text();
    })
    .then(data =>  {
        console.log(data)
        setUser(null)
    })
    .catch((err) => console.log(err))
  }

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
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Työtunti laskuri
          </Typography>
          {!user && (
            <Button color="success" variant='contained' component={Link} to="/login">Kirjaudu sisään</Button>
          )}
          {user && (
            <Button color="error" variant='contained' onClick={() => logout()}>Kirjaudu ulos</Button>
          )}

        </Toolbar>
      </AppBar>
      <MenuDrawer setOpen={setOpen} open={open} />
    </Box>
  );
}


