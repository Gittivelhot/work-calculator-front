import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';


export default function MenuDrawer({open, setOpen}) {

    const links = [
        {name: "Koti", address: "/" , icon: <HomeIcon /> },
        {name: "Kalenteri", address: "/calendar" , icon: <CalendarMonthIcon /> },
        {name: "Placeholder #1", address: "/#" ,icon: <AddCircleOutlineIcon /> },
        
    ] 

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map((link) => (
          <ListItem key={link.name} disablePadding>
            <ListItemButton component={Link} to={link.address}>
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
        <Drawer
            anchor={"left"}
            open={open}
            onClose={toggleDrawer(false)}
        >
            {list()}
        </Drawer>
  );
}