import React from 'react';
import Grid from '@mui/material/Grid';
import ReviewTile from '../components/ReviewTile';

export default function ReviewPage({ posts, handlePostSelect }) {
  const postsWithAuthor = posts.filter(post => post.author);
  console.log(postsWithAuthor);

  return (
    <Grid container spacing={4}>
      {postsWithAuthor.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <ReviewTile id={post.id} tags={post.tags} rating={post.rating} title={post.title} author={post.author} perex={post.perex} onPostSelect={handlePostSelect}/>
        </Grid>
      ))}
    </Grid>
    
  );
}