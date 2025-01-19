import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import { fetchCollection, addDocument, updateDocument, deleteDocument } from '../utils/firebaseUtils';
import { deleteDoc, doc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore'; // Import necessary functions from Firebase
import { db, auth } from '../config/firebase'; // Import db from your Firebase config
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';
import NewAdminReviewTile from './NewAdminReviewTile';
import { getFields } from '../config/formFields'; // Import getFields function
import { validateFields } from '../config/validation'; // Import validateFields function

export default function NewAdminReviewsPage() {
  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newTags, setnewTags] = useState([]);
  const [newTitle, setnewTitle] = useState('');
  const [newTitleEng, setnewTitleEng] = useState('');
  const [newAuthor, setnewAuthor] = useState('');
  const [newDate, setnewDate] = useState(new Date());
  const [newRating, setnewRating] = useState(0);
  const [newPerex, setnewPerex] = useState('');
  const [newPerexEng, setnewPerexEng] = useState('');
  const [newContent, setnewContent] = useState('');
  const [newContentEng, setnewContentEng] = useState('');
  const [newPositives, setnewPositives] = useState([]);
  const [newPositivesEng, setnewPositivesEng] = useState([]);
  const [newNegatives, setnewNegatives] = useState([]);
  const [newNegativesEng, setnewNegativesEng] = useState([]);
  const [newLink, setnewLink] = useState('');
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [existingTags, setExistingTags] = useState([]);
  const [urlTitle, setUrlTitle] = useState('');
  const [urlTitleEng, setUrlTitleEng] = useState('');

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

  async function onSubmitPost() {
    const newErrors = validateFields({
      tags: newTags,
      title: newTitle,
      title_eng: newTitleEng,
      date: newDate,
      rating: newRating,
      perex: newPerex,
      perex_eng: newPerexEng,
      content: newContent,
      content_eng: newContentEng,
      positives: newPositives,
      positives_eng: newPositivesEng,
      negatives: newNegatives,
      negatives_eng: newNegativesEng,
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const generatedUrlTitle = generateUrlTitle(newTitle);
    setUrlTitle(generatedUrlTitle);

    const generatedUrlTitleEng = generateUrlTitle(newTitleEng);
    setUrlTitle(generatedUrlTitleEng);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      await addDoc(collection(db, 'posts'), {
        tags: newTags,
        title: newTitle,
        title_eng: newTitleEng,
        author: newAuthor,
        date: newDate ? newDate.toISOString() : null,
        rating: newRating,
        perex: newPerex,
        perex_eng: newPerexEng,
        content: newContent,
        content_eng: newContentEng,
        positives: newPositives,
        positives_eng: newPositivesEng,
        negatives: newNegatives,
        negatives_eng: newNegativesEng,
        link: newLink,
        urlTitle: generatedUrlTitle,
        urlTitle_eng: generatedUrlTitleEng,
        userId: user.uid, // Ensure the userId field matches the authenticated user's UID
      });
      getPosts();
      setnewTags([]);
      setnewTitle('');
      setnewTitleEng('');
      setnewAuthor('');
      setnewDate(new Date());
      setnewRating(0);
      setnewPerex('');
      setnewPerexEng('');
      setnewContent('');
      setnewContentEng('');
      setnewPositives([]);
      setnewPositivesEng([]);
      setnewNegatives([]);
      setnewNegativesEng([]);
      setnewLink('');
      setUrlTitle('');
      setUrlTitleEng('');
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'tags':
        setnewTags(value);
        break;
      case 'title':
        setnewTitle(value);
        break;
      case 'title_eng':
        setnewTitleEng(value);
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
      case 'perex_eng':
        setnewPerexEng(value);
        break;
      case 'content':
        setnewContent(value);
        break;
      case 'content_eng':
        setnewContentEng(value);
        break;
      case 'rating':
        setnewRating(value);
        break;
      case 'positives':
        setnewPositives(value);
        break;
      case 'positives_eng':
        setnewPositivesEng(value);
        break;
      case 'negatives':
        setnewNegatives(value);
        break;
      case 'negatives_eng':
        setnewNegativesEng(value);
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
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      if (docToDelete) {
        const docRef = doc(db, 'posts', docToDelete);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          if (docSnapshot.data().userId === user.uid) {
            await deleteDoc(docRef);
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

  function openDialog(id) {
    setDocToDelete(id);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setDocToDelete(null);
  }

 // Updating a document
 async function updatePost(id, tags, title, title_eng, author, date, rating, perex, perex_eng, content, content_eng, positives, positives_eng, negatives, negatives_eng, link) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    ('Attempting to update document:', id);

    const docRef = doc(db, 'posts', id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      if (docSnapshot.data().userId === user.uid) {
        await updateDocument('posts', id, {
          tags,
          date,
          title,
          title_eng,
          author,
          rating,
          perex,
          perex_eng,
          content,
          content_eng,
          positives,
          positives_eng,
          negatives,
          negatives_eng,
          link,
        });
        const postsData = await fetchCollection('posts');
        const filteredData = postsData.filter((post) => post.author); // Filter out posts with an author
        setPosts(filteredData);
      } else {
        throw new Error('User does not have permission to update this document');
      }
    } else {
      throw new Error('Document does not exist');
    }
  } catch (err) {
    console.error('Error updating post:', err);
  }
}


  return (
    <>
      {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej novou recenzi</Button>
        </Stack>
      ) : (
        <AdminNewForm
          title="Nová recenze"
          fields={getFields({
            tags: newTags,
            title: newTitle,
            title_eng: newTitleEng,
            author: newAuthor,
            date: newDate,
            rating: newRating,
            perex: newPerex,
            perex_eng: newPerexEng,
            content: newContent,
            content_eng: newContentEng,
            positives: newPositives,
            positives_eng: newPositivesEng,
            negatives: newNegatives,
            negatives_eng: newNegativesEng,
            link: newLink,
          })}
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
            title_eng={post.title_eng}
            author={post.author}
            date={post.date}
            rating={post.rating}
            perex={post.perex}
            perex_eng={post.perex_eng}
            content={post.content}
            content_eng={post.content_eng}
            positives={post.positives}
            positives_eng={post.positives_eng}
            negatives={post.negatives}
            negatives_eng={post.negatives_eng}
            link={post.link}
            deletePost={() => openDialog(post.id)}
            updatePost={updatePost} 
            existingTags={existingTags} // Pass existingTags to NewAdminReviewTile
            errors={errors}
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
    </>
  );
}