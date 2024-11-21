import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Link, Input, Button } from '@mui/material';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function logIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // Redirect to dashboard after login
        } catch (err) {
            console.log(err);
        }
    }

    async function logOut() {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to login page after logout
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Stack spacing={5} sx={{ maxWidth: '30rem' }}>
            <Typography variant='h1'>Přihlášení do administrace</Typography>
            <Input 
                type="text" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} 
            />
            <Button variant='contained' onClick={logIn}>Login</Button>
            {/* <Button onClick={logOut}>Logout</Button> */}
        </Stack>
    );
}