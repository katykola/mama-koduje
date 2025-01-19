import React, { useState } from 'react';
import { Box, Typography, Link, Stack, Button, useMediaQuery, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminEditForm from './AdminEditForm';
import { validateFields } from '../config/validation'; // Import validateFields function

export default function AdminLifeTile({ id, order, termin, termin_eng, title, title_eng, subtitle, text, text_eng, deleteLifeXP, updateLifeXP }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isEditing, setIsEditing] = useState(false);

  const [editedOrder, setEditedOrder] = useState(order);
  const [editedTermin, setEditedTermin] = useState(termin);
  const [editedTerminEng, setEditedTerminEng] = useState(termin_eng);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedTitleEng, setEditedTitleEng] = useState(title_eng);
  const [editedSubtitle, setEditedSubtitle] = useState(subtitle);
  const [editedText, setEditedText] = useState(text);
  const [editedTextEng, setEditedTextEng] = useState(text_eng);

  const [errors, setErrors] = useState({});

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Handle save');
    console.log('editedOrder:', editedOrder);
    const newErrors = validateFields({
      order: editedOrder,
      termin: editedTermin,
      termin_eng: editedTerminEng,
      title: editedTitle,
      title_eng: editedTitleEng,
      subtitle: editedSubtitle,
      text: editedText,
      text_eng: editedTextEng,
    }, false, true);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log('Saving...');

    updateLifeXP(id, editedOrder, editedTermin, editedTerminEng, editedTitle, editedTitleEng, editedSubtitle, editedText, editedTextEng);
    toggleEdit();
    console.log('Saved!');
  };


  return (
    <>
      {!isEditing ? (
        <Stack direction="column" sx={{ border: '1px solid var(--border-color)' }}>
          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            spacing={2}
            sx={{
              alignItems: 'baseline',
              justifyContent: isSmallScreen ? 'center' : 'start',
              padding: '1rem',
            }}
          >
            <Stack
              direction={isSmallScreen ? 'column' : 'row'}
              spacing={2}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'baseline',
                width: '100%',
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', justifyContent: 'center' }}>
                <Box
                  sx={{
                    top: '1.5rem',
                    left: '1.5rem',
                    backgroundColor: 'var(--tertiary-color)',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="tileTextSm" sx={{ color: 'white', padding: '0.5rem', fontSize: '1rem' }}>
                    {order}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
                  {termin}
                </Typography>
              </Stack>
              <Typography variant="tileTitle" sx={{ marginTop: '1rem' }}>
                <Link>{title}</Link>
              </Typography>
              <Typography variant="author" sx={{ marginTop: '1rem' }}>
                {subtitle}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: isSmallScreen ? 'center' : 'end',
              }}
            >
              <Button variant="outlined" color="primary" onClick={toggleEdit}>
                Editovat
              </Button>
              <Button onClick={() => deleteLifeXP(id)} variant="outlined" color="primary">
                Vymazat
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <AdminEditForm
        values={{
          order: editedOrder,
          termin: editedTermin,
          termin_eng: editedTerminEng,
          title: editedTitle,
          title_eng: editedTitleEng,
          subtitle: editedSubtitle,
          text: editedText,
          text_eng: editedTextEng,
         }}
         isLifeXP={true}
         errors={errors}
          onChange={(name, value) => {
            switch (name) {
              case 'order':
                setEditedOrder(value);
                break;
              case 'termin':
                setEditedTermin(value);
                break;
              case 'termin_eng':
                setEditedTerminEng(value);
                break;
              case 'title':
                setEditedTitle(value);
                break;
              case 'title_eng':
                setEditedTitleEng(value);
                break;
              case 'subtitle':
                setEditedSubtitle(value);
                break;
              case 'text':
                setEditedText(value);
                break;
              case 'text_eng':
                setEditedTextEng(value);
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