import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar({user, setUser}) {

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{ backgroundColor: '#262626' }}>
        <Toolbar>
        {user && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}