import React from 'react';
import Grid from '@mui/material/Grid';
import ReviewTile from '../components/ReviewTile';

export default function ReviewPageEng({ posts, handlePostSelect }) {

  const postsEng = posts.filter(post => post.author && post.perex_eng);

  return (
    <Grid container spacing={4}>
      {postsEng.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex' }}>
          <ReviewTile id={post.id} key={post.id} tags={post.tags} rating={post.rating} title={post.title_eng} urlTitle={post.urlTitle_eng} author={post.author} perex={post.perex_eng} onPostSelect={handlePostSelect} sx={{ width: '100%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
           />
        </Grid>
      ))}
    </Grid>
    
  );
}