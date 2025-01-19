import React, { useState } from 'react';
import { Stack, Button, Typography, TextField, Box } from '@mui/material';
import { validateFields } from '../config/validation'; // Import the validateFields function
import { getFields } from '../config/formFields';
import AdminEditForm from './AdminEditForm';

export default function AdminPostTile({
  id,
  title,
  title_eng,
  date,
  perex,
  perex_eng,
  content,
  content_eng,
  image,
  updatePost,
  deletePost
}) {

  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedTitleEng, setEditedTitleEng] = useState(title_eng);
  const [editedDate, setEditedDate] = useState(dateObject);
  const [editedPerex, setEditedPerex] = useState(perex);
  const [editedPerexEng, setEditedPerexEng] = useState(perex_eng);
  const [editedContent, setEditedContent] = useState(content);
  const [editedContentEng, setEditedContentEng] = useState(content_eng);
  const [editedImage, setEditedImage] = useState(image);
  const [errors, setErrors] = useState({}); 

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const newErrors = validateFields({
      title: editedTitle,
      title_eng: editedTitleEng,
      date: editedDate,
      perex: editedPerex,
      perex_eng: editedPerexEng,
      content: editedContent,
      content_eng: editedContentEng,
      image: editedImage,
    }, true, false);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    updatePost(id, editedDate.toISOString(), editedTitle, editedTitleEng, editedPerex, editedPerexEng, editedContent, editedContentEng, editedImage);
    setIsEditing(false);
  };

  const values = {
    title: editedTitle,
    title_eng: editedTitleEng,
    date: editedDate,
    perex: editedPerex,
    perex_eng: editedPerexEng,
    content: editedContent,
    content_eng: editedContentEng,
    image: editedImage,
  };

  const fields = getFields(values, true, false); 

  return (
    <>
      {!isEditing ? (
        <Stack spacing={2} sx={{ border: '1px solid var(--border-color)', p: 2 }}>
          <Typography>{formattedDate}</Typography>
          <Typography variant='tileTitle'>{title}</Typography>
          <Typography>{perex}</Typography>
          <Stack direction='row' spacing={2} sx={{ justifyContent: 'end' }}>
            <Button variant="outlined" onClick={toggleEdit}>Editovat</Button>
            <Button variant="outlined" onClick={() => deletePost(id)}>Vymazat</Button>
          </Stack>
        </Stack>
      ) : (
        <AdminEditForm
          values={values}
          fields={fields}
          isPost={true}
          errors={errors}
          onChange={(name, value) => {
            switch (name) {
              case 'title':
                setEditedTitle(value);
                break;
              case 'title_eng':
                setEditedTitleEng(value);
                break;        
              case 'date':
                setEditedDate(value);
                break;
              case 'perex':
                setEditedPerex(value);
                break;
              case 'perex_eng':
                 setEditedPerexEng(value);
                break;
              case 'content':
                setEditedContent(value);
                break;
              case 'content_eng':
                setEditedContentEng(value);
                break;
              case 'image':
                setEditedImage(value);
                break;
              default:
                break;
            }
          }}
          onSave={handleSave}
          onCancel={toggleEdit}
        />
        
      )}
    </>
  );
}