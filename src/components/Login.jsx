import React, { useState } from 'react';
import { Button, TextField } from '@mui/material'
import Stack from '@mui/material/Stack';
import '../styles/login.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Login({ setUser }) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const login = () => {
        const base64Credentials = window.btoa(username + ":" + password);

        fetch('/api/login?remember-me=true', {
            credentials: 'include',
            headers: {
                'Authorization': 'Basic ' + base64Credentials,
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data) {
                    setUser(data);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div id="logincontainer">
                <Box id="box" sx={{ boxShadow: 6, borderRadius: 1 }}>
                    <Typography style={{ fontSize: '25px' }}>Log in</Typography>
                    <div id="usernamediv">
                        <TextField fullWidth id="username" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div id="passworddiv">
                        <TextField fullWidth id="password" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} type="password" />
                    </div>
                    <div id="loginbuttondiv">
                        <Button id="loginbutton" variant="contained" onClick={login}>Login</Button>
                    </div>
                </Box>
            </div>
        </>
    )
}
