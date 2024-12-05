import React from 'react';
import Grid from '@mui/material/Grid';
import PostTile from '../components/PostTile';


export default function PostPage({posts, handlePostSelect}) {

  const postsWithoutAuthor = posts.filter(post => !post.author);

  return (
    <Grid container spacing={4}>
      {postsWithoutAuthor.map((post) => (
        <Grid item xs={12} sm={6} md={6} key={post.id} sx={{ display: 'flex' }}>
          <PostTile imgSrc={post.image} id={post.id} title={post.title} urlTitle={post.urlTitle} date={post.date} perex={post.perex} sx={{ width: '100%',  display: 'flex', flexDirection: 'column' }} />
        </Grid>
      ))}
    </Grid>
  );
}