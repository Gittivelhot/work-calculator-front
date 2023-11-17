import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../styles/login.css';

export default function Login({ setUser }) {
    // State variables to store the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Login function
    const login = () => {
        // Encode the credentials in base64 using the username and password
        const base64Credentials = window.btoa(username + ":" + password);

        // Make a fetch request for login
        fetch('/api/login?remember-me=true', {
            credentials: 'include',
            headers: {
                'Authorization': 'Basic ' + base64Credentials,
                'X-Requested-With': 'XMLHttpRequest' // Add 'X-Requested-With' header
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // If data is received, set the user and save it to state
                if (data) {
                    setUser(data);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {/* Login container */}
            <div id="logincontainer">
                {/* User interface box */}
                <Box id="box" sx={{ boxShadow: 6, borderRadius: 1 }}>
                    {/* Title */}
                    <Typography style={{ fontSize: '25px' }}>Log in</Typography>
                    {/* Username input field */}
                    <div id="usernamediv">
                        <TextField fullWidth id="username" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
                    </div>
                    {/* Password input field */}
                    <div id="passworddiv">
                        <TextField fullWidth id="password" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} type="password" />
                    </div>
                    {/* Login button */}
                    <div id="loginbuttondiv">
                        <Button id="loginbutton" variant="contained" onClick={login}>Login</Button>
                    </div>
                </Box>
            </div>
        </>
    )
}
