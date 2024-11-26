import React from 'react';
import Grid from '@mui/material/Grid';
import PostTile from '../components/PostTile';


export default function PostPage({posts, handlePostSelect}) {

  const postsWithoutAuthor = posts.filter(post => !post.author);

  return (
    <Grid container spacing={4}>
      {postsWithoutAuthor.map((post) => (
        <Grid item xs={12} sm={6} md={6} key={post.id}>
          <PostTile imgSrc='../littlehand_desktop.jpg' id={post.id} title={post.title} date={post.date} perex={post.perex} onPostSelect={handlePostSelect}/>
        </Grid>
      ))}
    </Grid>
  );
}