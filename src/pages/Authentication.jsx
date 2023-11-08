import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Login from '../components/Login';
import Signup from '../components/Signup';
import authentication from '../styles/authentication.css';


export default function Authentication({ setUser }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue)
  };

  return (
    <Box id="authcontainer" sx={{ width: '100%' }}>
      {tab === 0 && (
        <Box sx={{ p: 3 }}>
          <div id="tabcontainer">
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Log in" />
            <Tab label="Create user" />
          </Tabs>
          </div>
          <Login setUser={setUser} />
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ p: 3 }}>
          <div id="tabcontainer">
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Log in" />
            <Tab label="Create user" />
          </Tabs>
          </div>
          <Signup setUser={setUser} />
        </Box>
      )}
    </Box>
  );
}