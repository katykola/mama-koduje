import React, { useState, useEffect } from 'react';
import { Stack, Input, Button, FormControl, InputLabel, Typography } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import AdminPostTile from './AdminPostTile';

export default function AdminPostsPage() {

    const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
            const data = await getDocs(collection(db, "posts"));
            const filteredData = data.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .filter((post) => post.author); // Filter out posts with an author
            setPosts(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <Stack spacing={3}>
            {posts.map((post) => (
                <AdminPostTile
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={post.date}
                    perex={post.perex}
                />
            ))}
        </Stack>
    )
}