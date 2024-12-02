import React, { useState } from 'react';
import { Stack, Button, Typography, FormControl, TextField } from '@mui/material';
import AdminEditForm from './AdminEditForm';

export default function AdminReviewTile({ id, tags, title, author, date, rating, perex, content, positives, negatives, link, deletePost, updatePost }) {
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

  const [editedTags, setEditedTags] = useState(tags);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedDate, setEditedDate] = useState(dateObject);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedPerex, setEditedPerex] = useState(perex);
  const [editedContent, setEditedContent] = useState(content);
  const [editedPositives, setEditedPositives] = useState(positives);
  const [editedNegatives, setEditedNegatives] = useState(negatives);
  const [editedLink, setEditedLink] = useState(link);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updatePost(id, editedTags, editedTitle, editedAuthor, editedDate.toISOString(), editedRating, editedPerex, editedContent, editedPositives, editedNegatives, editedLink);
    setIsEditing(false);
  };

  const fields = [
    { name: 'tags', label: 'Štítky', value: editedTags },
    { name: 'title', label: 'Titulek', value: editedTitle },
    { name: 'author', label: 'Autor', value: editedAuthor },
    { name: 'date', label: 'Datum', value: editedDate, type: 'date' },
    { name: 'rating', label: 'Hodnocení', value: editedRating, type: 'number' },
    { name: 'perex', label: 'Perex', value: editedPerex },
    { name: 'content', label: 'Obsah článku', value: editedContent, multiline: true, minRows: 4 },
    { name: 'positives', label: 'Pozitiva', value: editedPositives },
    { name: 'negatives', label: 'Negativa', value: editedNegatives },
    { name: 'link', label: 'Odkaz', value: editedLink },
  ];

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
        <AdminEditForm
          fields={fields}
          onChange={(name, value) => {
            switch (name) {
              case 'title':
                setEditedTitle(value);
                break;
              case 'author':
                setEditedAuthor(value);
                break;              
              case 'date':
                setEditedDate(value);
                break;
              case 'rating':
                setEditedRating(value);
                break;
              case 'perex':
                setEditedPerex(value);
                break;
              case 'content':
                setEditedContent(value);
                break;
              case 'positives':
                setEditedPositives(value);
                break;              
              case 'negatives':
                setEditedNegatives(value);
                break;              
              case 'link':
                setEditedLink(value);
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