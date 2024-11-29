import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import { fetchCollection, addDocument, updateDocument, deleteDocument } from '../utils/firebaseUtils';
import { deleteDoc, doc, getDocs, collection, addDoc } from 'firebase/firestore'; // Import necessary functions from Firebase
import { db } from '../config/firebase'; // Import db from your Firebase config
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';
import NewAdminReviewTile from './NewAdminReviewTile';

export default function NewAdminReviewsPage() {

  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);

  const [posts, setPosts] = useState([]);

  const [newTags, setnewTags] = useState([]);
  const [newTitle, setnewTitle] = useState('');
  const [newAuthor, setnewAuthor] = useState('');
  const [newDate, setnewDate] = useState(new Date());
  const [newRating, setnewRating] = useState(0);
  const [newPerex, setnewPerex] = useState('');
  const [newContent, setnewContent] = useState('');
  const [newPositives, setnewPositives] = useState([]);
  const [newNegatives, setnewNegatives] = useState([]);
  const [newLink, setnewLink] = useState('');

  const [errors, setErrors] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [existingTags, setExistingTags] = useState([]);


  // Getting data from Firebase

  async function getPosts() {
    try {
      const data = await getDocs(collection(db, "posts"));
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((post) => post.author); 
      setPosts(filteredData);
      loadTags(filteredData); // Load tags from the filtered posts data

    } catch (err) {
      console.error('Error loading posts:', err);
    }
  }
  
  function loadTags(postsData) {
    try {
      const tags = postsData.flatMap(post => post.tags || []);
      setExistingTags([...new Set(tags)]); // Remove duplicates
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // Adding a new document

  function toggleCreateNew() {
    setIsHiddenCreateNew(!isHiddenCreateNew);
  }

  function validateFields() {
    const newErrors = {};
    console.log(newTags);
    if (newTags.length === 0) newErrors.tags = 'Musíte vybrat alespoň jeden štítek';
    if (!newTitle) newErrors.title = 'Název je povinné';
    if (!newDate) newErrors.date = 'Datum je povinné';
    if (newRating < 1 || newRating > 5) newErrors.rating = 'Hodnocení musí být mezi 1 a 5';
    if (!newPerex) newErrors.perex = 'Perex je povinné';
    if (!newContent) newErrors.content = 'Obsah je povinné';
    if (newPositives.length === 0) newErrors.positives = 'Musíte vyplnit alespoň jedno pozitivum';
    if (newNegatives.length === 0) newErrors.negatives = 'Musíte vyplnit alespoň jedno negativum';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    if (!validateFields()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        tags: newTags,
        title: newTitle,
        author: newAuthor,
        date: newDate ? newDate.toISOString() : null,
        rating: newRating,
        perex: newPerex,
        content: newContent,
        positives: newPositives,
        negatives: newNegatives,
        link: newLink,
      });
      getPosts();
      setnewTags([]);
      setnewTitle('');
      setnewDate(new Date());
      setnewRating(0);
      setnewPerex('');
      setnewContent('');
      setnewPositives([]);
      setnewNegatives([]);
      setnewLink('');
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  const fields = [
    { name: 'tags', label: 'Tagy', value: newTags, required: true, type: 'array' },
    { name: 'title', label: 'Titulek', value: newTitle, required: true },
    { name: 'author', label: 'Autor', value: newAuthor, required: true },
    { name: 'date', label: 'Datum', value: newDate, required: true, type: 'date' },
    { name: 'rating', label: 'Hodnocení', value: newRating, required: true, type: 'number' },
    { name: 'perex', label: 'Perex', value: newPerex, required: true },
    { name: 'content', label: 'Obsah článku', value: newContent, required: true, multiline: true, minRows: 4 },
    { name: 'positives', label: 'Pozitiva', value: newPositives, required: true, type: 'array' },
    { name: 'negatives', label: 'Negativa', value: newNegatives, required: true, type: 'array' },
    { name: 'link', label: 'Odkaz', value: newLink, required: false },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'tags':
        setnewTags(value);
        break;
      case 'title':
        setnewTitle(value);
        break;
      case 'author':
        setnewAuthor(value);
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
      case 'rating':
        setnewRating(value);
        break;
      case 'positives':
        setnewPositives(value);
        break;
      case 'negatives':
        setnewNegatives(value);
        break;
      case 'link':
        setnewLink(value);
        break;
      default:
        break;
    }
  };

  // Deleting a document

  async function handleDeleteDoc() {
    try {
      if (docToDelete) {
        await deleteDoc(doc(db, 'posts', docToDelete)); // Use deleteDoc and doc from Firebase
        await getPosts(); // Reload posts after deletion
        setIsDialogOpen(false);
        setDocToDelete(null);
      }
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  }

  function openDialog(id) {
    setDocToDelete(id);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setDocToDelete(null);
  }

  // Updating a document

  async function updatePost(id, tags, title, author, date, rating, perex, content, positives, negatives, link) {
    try {
      await updateDocument('posts', id, {
        tags,
        date,
        title,
        author,
        rating,
        perex,
        content,
        positives,
        negatives,
        link,
      });
      const postsData = await fetchCollection('posts');
      const filteredData = postsData.filter((post) => post.author); // Filter out posts with an author
      setPosts(filteredData);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  }

  console.log(errors);

  return (
    <>

    {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej nový článek</Button>
        </Stack>
      ) : (
        <AdminNewForm
          title="Nová recenze"
          fields={fields}
          errors={errors}
          existingTags={existingTags}
          onChange={handleFieldChange}
          onSubmit={onSubmitPost}
          onCancel={toggleCreateNew}
        />
      )}

      <Stack spacing={3}>
        {posts.map((post) => (
          <NewAdminReviewTile
            key={post.id}
            id={post.id}
            tags={post.tags}
            title={post.title}
            author={post.author}
            date={post.date}
            rating={post.rating}
            perex={post.perex}
            content={post.content}
            positives={post.positives}
            negatives={post.negatives}
            link={post.link}
            deletePost={() => openDialog(post.id)}
            updatePost={updatePost} 
            existingTags={existingTags} // Pass existingTags to NewAdminReviewTile
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
    </>
  );
}