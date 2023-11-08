import React, { useState } from 'react';
import { Button, TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import '../styles/signup.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Signup({ setUser }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const signup = () => {
        const data = {
            username: username,
            password: password,
            passwordCheck: passwordCheck
        }
        fetch('/api/signup?remember-me=true', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
            .then(response => {
                if (response.ok) {
                    setError(false);
                    setSuccess(true);
                    setUsername('')
                    setPassword('')
                    setPasswordCheck('')
                }
                else {
                    setSuccess(false);
                    setError(true);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div id="signupcontainer">
                <Box id="box" sx={{ boxShadow: 6, borderRadius: 1 }}>
                    <Typography style={{ fontSize: '25px' }}>Sign up</Typography>
                    <div id="usernamediv">
                        <TextField fullWidth id="username" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div id="passworddiv">
                        <TextField fullWidth id="password" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} type="password" />
                    </div>
                    <div id="checkpassworddiv">
                        <TextField fullWidth id="checkpassword" label="Password Check" variant="outlined" onChange={e => setPasswordCheck(e.target.value)} type="password" />
                    </div>
                    <div id="signupbuttondiv">
                        <Button id="signupbutton" variant="contained" onClick={signup}>Sign up</Button>
                    </div>
                </Box>
                <div id="errorcontainer">
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Käyttäjän luonti epäonnistui!</AlertTitle>
                        Käyttäjänimi on jo käytössä — <strong>kokeile uudelleen!</strong>
                    </Alert>
                )}
                {success && (
                    <Alert severity="success">
                        <AlertTitle>Käyttäjän luonti onnistui!</AlertTitle>
                        Kirjaudu sisään käyttäjälle — <strong>Tervetuloa!</strong>
                    </Alert>
                )}
                </div>
            </div>
        </>
    )
}
