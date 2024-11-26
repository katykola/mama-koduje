import React, { useState, useEffect } from 'react';
import { Stack, Input, Button, FormControl, InputLabel, Typography } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

export default function AdminPostsPage() {

    const [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
            const data = await getDocs(collection(db, "posts"));
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPosts(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    console.log(posts);

    return (
        <div>
            <h1>Admin Posts Page</h1>
        </div>
    )
}