import React, { useState, useEffect } from 'react';
import { Stack, Input, Button, FormControl, InputLabel, Typography } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import AdminLifePage from './AdminLifePage';
import AdminPostsPage from './AdminPostsPage';

export default function DashboardPage({  }) {

  const [activePage, setActivePage] = useState(null);

  const getLifePage = () => {
    setActivePage('life');
  };

  const getPostsPage = () => {
    setActivePage('posts');
  };

  return(
    <>
      <Button variant='outlined' onClick={getLifePage}>Životní zkušenosti</Button>
      <Button variant='outlined' onClick={getPostsPage}>Příspěvky</Button>
      {activePage === 'life' && <AdminLifePage />}
      {activePage === 'posts' && <AdminPostsPage />}
    </>
  )
}