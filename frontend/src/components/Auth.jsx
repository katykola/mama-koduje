import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function signUp() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // Redirect to dashboard after sign up
        } catch (err) {
            console.log(err);
        }
    }

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
        <div>
            <h1>Admin</h1>
            <input 
                type="text" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={logIn}>Login</button>
            <button onClick={logOut}>Logout</button>
        </div>
    );
}