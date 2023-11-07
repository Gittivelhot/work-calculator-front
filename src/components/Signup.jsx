import  React, { useState } from 'react';
import { Button, TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Signup({ setUser }) {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[passwordCheck, setPasswordCheck] = useState('');
    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(false);

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
            if(response.ok){
                setError(false);
                setSuccess(true);
                setUsername('')
                setPassword('')
                setPasswordCheck('')
            }
            else{
                setSuccess(false);
                setError(true);
            }
        })
        .catch((err) => console.log(err))      
    }

    return (
        <> 

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
            <TextField label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} type="password" />
            <TextField label="Password Check" variant="outlined" onChange={e => setPasswordCheck(e.target.value)} type="password" />
            <Button onClick={signup}>Sign up</Button>
        </>
    )
}
