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
  const [newTitle, setnewTitle] = useState('');
  const [newDate, setnewDate] = useState(new Date());
  const [newPerex, setnewPerex] = useState('');
  const [newContent, setnewContent] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
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
        .filter((post) => !post.author); 
      setPosts(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const generateUrlTitle = (title) => {
    const czechMap = {
      'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z',
      'Á': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E', 'Ě': 'E', 'Í': 'I', 'Ň': 'N', 'Ó': 'O', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U', 'Ý': 'Y', 'Ž': 'Z'
    };
  
    return title
      .split('')
      .map(char => czechMap[char] || char)
      .join('')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  function validateFields() {
    const newErrors = {};
    if (!newTitle) newErrors.title = 'Název je povinné';
    if (!newDate) newErrors.date = 'Datum je povinné';
    if (!newPerex) newErrors.perex = 'Perex je povinné';
    if (!newContent) newErrors.content = 'Obsah je povinné';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    if (!validateFields()) return;

    const generatedUrlTitle = generateUrlTitle(newTitle);
    setUrlTitle(generatedUrlTitle);

    try {
      await addDoc(collection(db, 'posts'), {
        title: newTitle,
        date: newDate ? newDate.toISOString() : null,
        perex: newPerex,
        content: newContent,
        urlTitle: generatedUrlTitle,
      });
      getPosts();
      setnewTitle('');
      setnewDate(new Date());
      setnewPerex('');
      setnewContent('');
      setUrlTitle('');
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
    { name: 'title', label: 'Titulek', value: newTitle, required: true },
    { name: 'date', label: 'Datum', value: newDate, required: true, type: 'date' },
    { name: 'perex', label: 'Perex', value: newPerex, required: true },
    { name: 'content', label: 'Obsah článku', value: newContent, required: true, multiline: true, minRows: 4 },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'title':
        setnewTitle(value);
        break;
      case 'date':
        setnewDate(value);
        break;
      case 'perex':
        setnewPerex(value);
        break;
      case 'content':
        setnewContent(value);
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