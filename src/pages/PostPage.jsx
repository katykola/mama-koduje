import { useState, useEffect } from 'react';
import React from 'react';
import Grid from '@mui/material/Grid';
import PostTile from '../components/PostTile';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PostPage() {

  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  const handlePostSelect = (id) => {
    console.log('Selected Post ID:', id);
    setSelectedPostId(id);
  };

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={6} key={post.id}>
          <PostTile imgSrc='../littlehand_desktop.jpg' id={post.id} title={post.title} date={post.date} content={post.content} onPostSelect={handlePostSelect}/>
        </Grid>
      ))}
    </Grid>
  );
}