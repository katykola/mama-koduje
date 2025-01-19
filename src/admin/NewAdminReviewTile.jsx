import React, { useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import AdminEditForm from './AdminEditForm';
import { validateFields } from '../config/validation'; // Import validateFields function

export default function NewAdminReviewTile({ id, tags, title, title_eng, author, date, rating, perex, perex_eng, content, content_eng, positives, positives_eng, negatives, negatives_eng, link, deletePost, updatePost, existingTags }) {

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
  const [editedTitleEng, setEditedTitleEng] = useState(title_eng);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedDate, setEditedDate] = useState(dateObject);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedPerex, setEditedPerex] = useState(perex);
  const [editedPerexEng, setEditedPerexEng] = useState(perex_eng);
  const [editedContent, setEditedContent] = useState(content);
  const [editedContentEng, setEditedContentEng] = useState(content_eng);
  const [editedPositives, setEditedPositives] = useState(positives);
  const [editedPositivesEng, setEditedPositivesEng] = useState(positives_eng);
  const [editedNegatives, setEditedNegatives] = useState(negatives);
  const [editedNegativesEng, setEditedNegativesEng] = useState(negatives_eng);
  const [editedLink, setEditedLink] = useState(link);
  const [errors, setErrors] = useState({}); 

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const newErrors = validateFields({
      tags: editedTags,
      title: editedTitle,
      title_eng: editedTitleEng,
      date: editedDate,
      rating: editedRating,
      perex: editedPerex,
      perex_eng: editedPerexEng,
      content: editedContent,
      content_eng: editedContentEng,
      positives: editedPositives,
      positives_eng: editedPositivesEng,
      negatives: editedNegatives,
      negatives_eng: editedNegativesEng,
    }, false, false);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updatePost(id, editedTags, editedTitle, editedTitleEng, editedAuthor, editedDate.toISOString(), editedRating, editedPerex, editedPerexEng,editedContent, editedContentEng, editedPositives, editedPositivesEng, editedNegatives,  editedNegativesEng, editedLink);
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
        <AdminEditForm
          values={{
            tags: editedTags,
            title: editedTitle,
            title_eng: editedTitleEng,
            author: editedAuthor,
            date: editedDate,
            rating: editedRating,
            perex: editedPerex,
            perex_eng: editedPerexEng,
            content: editedContent,
            content_eng: editedContentEng,
            positives: editedPositives,
            positives_eng: editedPositivesEng,
            negatives: editedNegatives,
            negatives_eng: editedNegativesEng,
            link: editedLink,
          }}
          errors={errors}
          isLifeXP={false}
          existingTags={existingTags}
          onChange={(name, value) => {
            switch (name) {
              case 'tags':
                setEditedTags(value);
                break;
              case 'title':
                setEditedTitle(value);
                break;              
              case 'title_eng':
                setEditedTitleEng(value);
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
              case 'perex_eng':
                setEditedPerexEng(value);
                break;
              case 'content':
                setEditedContent(value);
                break;
              case 'content_eng':
                setEditedContentEng(value);
                break;
              case 'positives':
                setEditedPositives(value);
                break;
              case 'positives_eng':
                setEditedPositivesEng(value);
                break;               
              case 'negatives':
                setEditedNegatives(value);
                break;
              case 'negatives_eng':
                setEditedNegativesEng(value);
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