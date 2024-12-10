import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import { db, auth } from '../config/firebase';
import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import AdminPostTile from './AdminPostTile';
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';
import { uploadImageToCloudinary } from '../config/cloudinaryUpload';

export default function AdminPostsPage() {
  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newPerex, setNewPerex] = useState('');
  const [newContent, setNewContent] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [editValues, setEditValues] = useState(null);

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
    if (!newImage) newErrors.image = 'Obrázek je povinný';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    if (!validateFields()) return;

    const generatedUrlTitle = generateUrlTitle(newTitle);
    setUrlTitle(generatedUrlTitle);

    try {
      let imageUrl = '';
      if (newImage) {
        imageUrl = await uploadImageToCloudinary(newImage);
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      await addDoc(collection(db, 'posts'), {
        title: newTitle,
        date: newDate ? newDate.toISOString() : null,
        perex: newPerex,
        content: newContent,
        urlTitle: generatedUrlTitle,
        image: imageUrl,
        userId: user.uid, // Ensure the userId field matches the authenticated user's UID
      });
      getPosts();
      setNewTitle('');
      setNewDate(new Date());
      setNewPerex('');
      setNewContent('');
      setUrlTitle('');
      setNewImage(null);
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDoc() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      console.log('Attempting to delete document:', docToDelete);
      console.log('Authenticated user ID:', user.uid);

      if (docToDelete) {
        const docRef = doc(db, 'posts', docToDelete);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          console.log('Document exists:', docSnapshot.data());
          console.log('Document userId:', docSnapshot.data().userId);
          if (docSnapshot.data().userId === user.uid) {
            await deleteDoc(docRef);
            console.log('Document deleted successfully');
            getPosts();
            setIsDialogOpen(false);
            setDocToDelete(null);
          } else {
            throw new Error('User does not have permission to delete this document');
          }
        } else {
          throw new Error('Document does not exist');
        }
      }
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  }

  async function updatePost(id, date, title, perex, content, image) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }
  
      const docRef = doc(db, 'posts', id);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
  
        // Validate and format the date
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
          throw new Error('Invalid Date');
        }
  
        if (docSnapshot.data().userId === user.uid) {
          await updateDoc(docRef, {
            date: formattedDate.toISOString(),
            title,
            perex,
            content,
            image,
            userId: user.uid, // Ensure the userId field matches the authenticated user's UID
          });
          console.log('Document updated successfully');
          getPosts();
        } else {
          throw new Error('User does not have permission to update this document');
        }
      } else {
        throw new Error('Document does not exist');
      }
    } catch (err) {
      console.log('Error updating document:', err);
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

  const handleEdit = (post) => {
    setEditValues(post);
    setIsHiddenCreateNew(false);
  };

  const fields = [
    { name: 'title', label: 'Titulek', value: newTitle, required: true },
    { name: 'date', label: 'Datum', value: newDate, required: true, type: 'date' },
    { name: 'perex', label: 'Perex', value: newPerex, required: true },
    { name: 'content', label: 'Obsah článku', value: newContent, required: true, multiline: true, minRows: 4 },
    { name: 'image', label: 'Obrázek', value: '', required: true, type: 'file' },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'title':
        setNewTitle(value);
        break;
      case 'date':
        setNewDate(value);
        break;
      case 'perex':
        setNewPerex(value);
        break;
      case 'content':
        setNewContent(value);
        break;
      case 'image':
        setNewImage(value);
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
            image={post.image}
            updatePost={updatePost}
            deletePost={() => openDialog(post.id)}
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />

    </Stack>
  );
}