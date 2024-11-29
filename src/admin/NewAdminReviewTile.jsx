import React, { useState } from 'react';
import { Stack, Button, Typography, FormControl, TextField } from '@mui/material';
import AdminEditForm from './AdminEditForm';

export default function NewAdminReviewTile({ id, tags, title, author, date, rating, perex, content, positives, negatives, link, deletePost, updatePost }) {
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

//   const [editedTags, setEditedTags] = useState(tags);
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedAuthor, setEditedAuthor] = useState(author);
//   const [editedDate, setEditedDate] = useState(dateObject);
//   const [editedRating, setEditedRating] = useState(rating);
//   const [editedPerex, setEditedPerex] = useState(perex);
//   const [editedContent, setEditedContent] = useState(content);
//   const [editedPositives, setEditedPositives] = useState(positives);
//   const [editedNegatives, setEditedNegatives] = useState(negatives);
//   const [editedLink, setEditedLink] = useState(link);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updatePost(id, editedTags, editedTitle, editedAuthor, editedDate.toISOString(), editedRating, editedPerex, editedContent, editedPositives, editedNegatives, editedLink);
    setIsEditing(false);
  };

  

  return (
    <>
      {!isEditing ? (
        <Stack spacing={2} sx={{ border: '1px solid var(--border-color)', p: 2 }}>
          <Typography>{formattedDate}</Typography>
          <Typography variant='tileTitle'>{title}</Typography>
          <Typography>{author}</Typography>
          <Stack direction='row' spacing={2} sx={{ justifyContent: 'end' }}>
            <Button variant="outlined" onClick={toggleEdit}>Editovat</Button>
            <Button variant="outlined" onClick={() => deletePost(id)}>Vymazat</Button>
          </Stack>
        </Stack>
      ) : (
        <Typography>Editing...</Typography>
    )}
    </>
  );
}