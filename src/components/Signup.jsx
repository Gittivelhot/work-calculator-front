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
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [difpassword, setDifpassword] = useState(false);

    const signup = () => {
        // Frontend password validation
        if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password)) {
            setError(false);
            setSuccess(false);
            setPasswordError(true);
            return;
        }
        if (username.length < 4) {
            setError(false);
            setSuccess(false);
            setPasswordError(false);
            setUsernameError(true);
            return;
        }
        if (password !== passwordCheck) {
            setError(false);
            setSuccess(false);
            setPasswordError(false);
            setUsernameError(false);
            setDifpassword(true);
            return;
        }
        
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
                setPasswordError(false);
                setUsernameError(false);
                setDifpassword(false);
                setUsername('');
                setPassword('');
                setPasswordCheck('');
            } else {
                setSuccess(false);
                setError(true);
                setPasswordError(false);
                setUsernameError(false);
                setDifpassword(false);
            }
        })
        .catch((err) => console.log(err));
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
                {passwordError && (
                        <Alert severity="error">
                            <AlertTitle>Salasanan asettaminen epäonnistui!</AlertTitle>
                            Salasanan on oltava vähintään 8 merkkiä pitkä. Sisältää vähintään yhden ison kirjaimen, yhden pienen kirjaimen ja yhden numeron. — <strong>kokeile uudelleen!</strong>
                        </Alert>
                    )}
                {usernameError && (
                        <Alert severity="error">
                            <AlertTitle>Käyttäjän luonti epäonnistui!</AlertTitle>
                            Käyttäjänimen on oltava vähintään 4 merkkiä pitkä — <strong>kokeile uudelleen!</strong>
                        </Alert>
                
                    )}
                {difpassword && (
                        <Alert severity="error">
                            <AlertTitle>Käyttäjän luonti epäonnistui!</AlertTitle>
                            Salasanat eivät täsmää — <strong>kokeile uudelleen!</strong>
                        </Alert>
                
                    )}
                </div>
            </div>
        </>
    )
}
