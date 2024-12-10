import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Input, Button } from '@mui/material';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function logIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user from the userCredential object
            navigate('/admin'); // Redirect to dashboard after login
            console.log('Logged in successfully', email, password);
            console.log('User ID:', user.uid); // Log the userId (UID)
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
        </Stack>
    );
}