import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import { fetchCollection, fetchExistingTags, addDocument, updateDocument, deleteDocument } from '../utils/firebaseUtils';
import AdminReviewTile from './AdminReviewTile';
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';

export default function AdminReviewsPage() {
  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newRating, setNewRating] = useState(0);
  const [newPerex, setNewPerex] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPositives, setNewPositives] = useState([]);
  const [newNegatives, setNewNegatives] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [existingTags, setExistingTags] = useState([]);
  const [urlTitle, setUrlTitle] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      const postsData = await fetchCollection('posts');
      const filteredData = postsData.filter((post) => post.author); // Filter out posts with an author
      setPosts(filteredData);
    }
    async function loadTags() {
      const tags = await fetchExistingTags('posts');
      setExistingTags(tags);
    }
    loadPosts();
    loadTags();
  }, []);

  function validateFields() {
    const newErrors = {};
    if (!newTitle) newErrors.title = 'Název je povinné';
    if (!newAuthor) newErrors.author = 'Autor je povinný';
    if (!newDate) newErrors.date = 'Datum je povinné';
    if (!newPerex) newErrors.perex = 'Perex je povinné';
    if (!newContent) newErrors.content = 'Obsah je povinné';
    if (newRating < 1 || newRating > 5) newErrors.rating = 'Hodnocení musí být mezi 1 a 5';
    if (newPositives.length === 0) newErrors.positives = 'Musíš vyplnit alespoň jedno pozitivum';
    if (newNegatives.length === 0) newErrors.negatives = 'Musíš vyplnit alespoň jedno negativum';
    if (newLink && !newLink.match(/^(http|https):\/\//)) newErrors.link = 'Odkaz musí mít formát http:// nebo https://';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    if (!validateFields()) return;

    await addDocument('posts', {
      tags: newTags,
      title: newTitle,
      author: newAuthor,
      rating: newRating,
      date: newDate ? newDate.toISOString() : null,
      perex: newPerex,
      content: newContent,
      positives: newPositives,
      negatives: newNegatives,
      link: newLink,
    });
    const postsData = await fetchCollection('posts');
    const filteredData = postsData.filter((post) => post.author); // Filter out posts with an author

    setPosts(filteredData);
    setNewTags([]);
    setNewTitle('');
    setNewAuthor('');
    setNewDate(new Date());
    setNewRating(0);
    setNewPerex('');
    setNewContent('');
    setNewPositives([]);
    setNewNegatives([]);
    setNewLink('');
    setErrors({});
    toggleCreateNew();
  }

  async function handleDeleteDoc(id) {
    await deleteDocument('posts', id);
    const postsData = await fetchCollection('posts');
    const filteredData = postsData.filter((post) => post.author); // Filter out posts with an author
    setPosts(filteredData);
  }

  async function updatePost(id, tags, title, author, date, rating, perex, content, positives, negatives, link) {
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
    { name: 'tags', label: 'Štítky', value: newTags, type: 'array' },
    { name: 'title', label: 'Titulek', value: newTitle, required: true },
    { name: 'author', label: 'Autor', value: newAuthor, required: true },
    { name: 'date', label: 'Datum', value: newDate, required: true, type: 'date' },
    { name: 'rating', label: 'Hodnocení', value: newRating, type: 'number' },
    { name: 'perex', label: 'Perex', value: newPerex, required: true },
    { name: 'content', label: 'Obsah článku', value: newContent, required: true, multiline: true, minRows: 4 },
    { name: 'positives', label: 'Pozitiva', value: newPositives, type: 'array' },
    { name: 'negatives', label: 'Negativa', value: newNegatives, type: 'array' },
    { name: 'link', label: 'Odkaz', value: newLink },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'tags':
        setNewTags(value);
        break;
      case 'title':
        setNewTitle(value);
        break;
      case 'author':
        setNewAuthor(value);
        break;
      case 'date':
        setNewDate(value);
        break;
      case 'rating':
        setNewRating(value);
        break;
      case 'perex':
        setNewPerex(value);
        break;
      case 'content':
        setNewContent(value);
        break;
      case 'positives':
        setNewPositives(value);
        break;
      case 'negatives':
        setNewNegatives(value);
        break;
      case 'link':
        setNewLink(value);
        break;
      default:
        break;
    }
  };

  console.log('urlTitle:', urlTitle);

  return (
    <Stack spacing={3}>
      {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej nový článek</Button>
        </Stack>
      ) : (
        <AdminNewForm
          title="Nová recenze"
          fields={fields}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={onSubmitPost}
          onCancel={toggleCreateNew}
          existingTags={existingTags}
        />
      )}

      {/* List all reviews */}
      <Stack spacing={3}>
        {posts.map((post) => (
          <AdminReviewTile
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
            deletePost={handleDeleteDoc} // Pass deletePost function
            updatePost={updatePost} // Pass updatePost function
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
    </Stack>
  );
}