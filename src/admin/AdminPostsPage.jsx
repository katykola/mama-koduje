import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import AdminPostTile from './AdminPostTile';
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';

export default function AdminPostsPage() {
  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDate, setNewPostDate] = useState(new Date());
  const [newPostPerex, setNewPostPerex] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [errors, setErrors] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  async function getPosts() {
    try {
      const data = await getDocs(collection(db, "posts"));
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((post) => !post.author); // Filter out posts with an author
      setPosts(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  function validateFields() {
    const newErrors = {};
    if (!newPostTitle) newErrors.title = 'Název je povinné';
    if (!newPostDate) newErrors.date = 'Datum je povinné';
    if (!newPostPerex) newErrors.perex = 'Perex je povinné';
    if (!newPostContent) newErrors.content = 'Obsah je povinné';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    if (!validateFields()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        title: newPostTitle,
        date: newPostDate ? newPostDate.toISOString() : null,
        perex: newPostPerex,
        content: newPostContent,
      });
      getPosts();
      setNewPostTitle('');
      setNewPostDate(new Date());
      setNewPostPerex('');
      setNewPostContent('');
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDoc() {
    try {
      if (docToDelete) {
        await deleteDoc(doc(db, 'posts', docToDelete));
        getPosts();
        setIsDialogOpen(false);
        setDocToDelete(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePost(id, date, title, perex, content) {
    try {
      await updateDoc(doc(db, 'posts', id), {
        date,
        title,
        perex,
        content,
      });
      getPosts();
    } catch (err) {
      console.log(err);
    }
  }

  function toggleCreateNew() {
    setIsHiddenCreateNew(!isHiddenCreateNew);
  }

  function openDialog(id) {
    setDocToDelete(id);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setDocToDelete(null);
  }

  const fields = [
    { name: 'title', label: 'Titulek', value: newPostTitle, required: true },
    { name: 'date', label: 'Datum', value: newPostDate, required: true, type: 'date' },
    { name: 'perex', label: 'Perex', value: newPostPerex, required: true },
    { name: 'content', label: 'Obsah článku', value: newPostContent, required: true, multiline: true, minRows: 4 },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'title':
        setNewPostTitle(value);
        break;
      case 'date':
        setNewPostDate(value);
        break;
      case 'perex':
        setNewPostPerex(value);
        break;
      case 'content':
        setNewPostContent(value);
        break;
      default:
        break;
    }
  };

  return (
    <Stack spacing={3}>
      {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej nový článek</Button>
        </Stack>
      ) : (
        <AdminNewForm
          title="Nový článek"
          fields={fields}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={onSubmitPost}
          onCancel={toggleCreateNew}
        />
      )}

      {/* List all Posts */}
      <Stack spacing={4}>
        {posts.map((post) => (
          <AdminPostTile
            key={post.id}
            id={post.id}
            title={post.title}
            date={post.date}
            perex={post.perex}
            content={post.content}
            updatePost={updatePost}
            deletePost={() => openDialog(post.id)}
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
      
    </Stack>
  );
}