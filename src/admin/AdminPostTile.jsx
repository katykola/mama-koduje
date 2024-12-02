import React, { useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import AdminEditForm from './AdminEditForm';
import { validateFields } from '../config/validation'; // Import validateFields function

export default function AdminPostTile({ id, title, date, perex, content, deletePost, updatePost }) {
  
  // Convert the date string to a Date object if it's not already a Date object
  let dateObject = typeof date === 'string' ? new Date(date) : date;
  // Check if dateObject is a valid Date object
  if (!(dateObject instanceof Date) || isNaN(dateObject)) {
    dateObject = new Date();
  }

  const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDate, setEditedDate] = useState(dateObject);
  const [editedPerex, setEditedPerex] = useState(perex);
  const [editedContent, setEditedContent] = useState(content);
  const [errors, setErrors] = useState({}); 


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const newErrors = validateFields({
      title: editedTitle,
      date: editedDate,
      perex: editedPerex,
      content: editedContent,
    }, true, false);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    updatePost(id, editedDate.toISOString(), editedTitle, editedPerex, editedContent);
    setIsEditing(false);
  };

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
        values={{
          title: editedTitle,
          date: editedDate,
          perex: editedPerex,
          content: editedContent,
         }}
          isPost = {true}
          errors={errors}

          onChange={(name, value) => {
            switch (name) {
              case 'title':
                setEditedTitle(value);
                break;
              case 'date':
                setEditedDate(value);
                break;
              case 'perex':
                setEditedPerex(value);
                break;
              case 'content':
                setEditedContent(value);
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