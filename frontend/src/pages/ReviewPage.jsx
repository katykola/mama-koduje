import React from 'react';
import Grid from '@mui/material/Grid';
import ReviewTile from '../components/ReviewTile';

export default function ReviewPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewTile />
      </Grid>
    </Grid>
    
  );
}