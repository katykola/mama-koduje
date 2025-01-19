import { useState, useEffect } from 'react';
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
  const [newTitleEng, setNewTitleEng] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newPerex, setNewPerex] = useState('');
  const [newPerexEng, setNewPerexEng] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newContentEng, setNewContentEng] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlTitleEng, setUrlTitleEng] = useState('');
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
    if (!newTitleEng) newErrors.title_eng = 'Název je povinné';
    if (!newDate) newErrors.date = 'Datum je povinné';
    if (!newPerex) newErrors.perex = 'Perex je povinné';
    if (!newPerexEng) newErrors.perex_eng = 'Perex is required';
    if (!newContent) newErrors.content = 'Obsah je povinné';
    if (!newContentEng) newErrors.content_eng = 'Obsah je povinné';
    if (!newImage) newErrors.image = 'Obrázek je povinný';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitPost() {
    console.log('onSubmitPost');
    if (!validateFields()) return;

    const generatedUrlTitle = generateUrlTitle(newTitle);
    setUrlTitle(generatedUrlTitle);

    const generatedUrlTitleEng = generateUrlTitle(newTitleEng);
    setUrlTitleEng(generatedUrlTitleEng);

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
        title_eng: newTitleEng,
        date: newDate ? newDate.toISOString() : null,
        perex: newPerex,
        perex_eng: newPerexEng,
        content: newContent,
        content_eng: newContentEng,
        urlTitle: generatedUrlTitle,
        urlTitle_eng: generatedUrlTitleEng,
        image: imageUrl,
        userId: user.uid, // Ensure the userId field matches the authenticated user's UID
      });
      getPosts();
      setNewTitle('');
      setNewTitleEng('');
      setNewDate(new Date());
      setNewPerex('');
      setNewPerexEng('');
      setNewContent('');
      setNewContentEng('');
      setUrlTitle('');
      setUrlTitleEng('');
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

  async function updatePost(id, date, title, title_eng, perex, perex_eng, content, content_eng, image) {
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
            title_eng,
            perex,
            perex_eng,
            content,
            content_eng,
            image,
            userId: user.uid, // Ensure the userId field matches the authenticated user's UID
          });
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
    { name: 'title_eng', label: 'Title ENG', value: newTitleEng, required: true }, 
    { name: 'date', label: 'Datum', value: newDate, required: true, type: 'date' },
    { name: 'perex', label: 'Perex', value: newPerex, required: true },
    { name: 'perex_eng', label: 'Perex ENG', value: newPerexEng, required: true },
    { name: 'content', label: 'Obsah článku', value: newContent, required: true, multiline: true, minRows: 4 },
    { name: 'content_eng', label: 'Blog content ENG', value: newContentEng, required: true, multiline: true, minRows: 4 },
    { name: 'image', label: 'Obrázek', value: '', required: true, type: 'file' },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'title':
        setNewTitle(value);
        break;
      case 'title_eng':
        setNewTitleEng(value);
        break;
      case 'date':
        setNewDate(value);
        break;
      case 'perex':
        setNewPerex(value);
        break;
      case 'perex_eng':
        setNewPerexEng(value);
        break;
      case 'content':
        setNewContent(value);
        break;
      case 'content_eng':
        setNewContentEng(value);
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
            title_eng={post.title_eng}
            date={post.date}
            perex={post.perex}
            perex_eng={post.perex_eng}
            content={post.content}
            content_eng={post.content_eng}
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