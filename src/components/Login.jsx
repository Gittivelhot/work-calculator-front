import  React, { useState } from 'react';
import { Button, TextField } from '@mui/material'

export default function Login({ setUser }) {


    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    
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
        .then(data =>  {
            console.log(data)
            if(data){
                setUser(data);
            }
        })
        .catch((err) => console.log(err))      
    }

    return (
        <>
            <TextField label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} type="password" />
            <Button onClick={login}>Login</Button>
        </>
    )
}
