import React from 'react';
import Grid from '@mui/material/Grid';
import PostTile from '../components/PostTile';

export default function PostPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={6}>
        <PostTile imgSrc="/littlehand_desktop.jpg" />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PostTile imgSrc="/littlehand_desktop.jpg" />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PostTile imgSrc="/littlehand_desktop.jpg" />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PostTile imgSrc="/littlehand_desktop.jpg" />
      </Grid>
    </Grid>
  );
}