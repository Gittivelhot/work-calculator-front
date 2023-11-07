import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Login from '../components/Login';
import Signup from '../components/Signup';


export default function Authentication({setUser}) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Log in" />
          <Tab label="Create user" />
        </Tabs>
      </Box>
        {tab === 0 && (
            <Box sx={{ p: 3 }}>
                <Login setUser={setUser} />
            </Box>
        )}
        {tab === 1 && (
            <Box sx={{ p: 3 }}>
                <Signup setUser={setUser} />
            </Box>
        )}
    </Box>
  );
}