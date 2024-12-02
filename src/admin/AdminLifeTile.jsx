import React, { useState } from 'react';
import { Box, Typography, Link, Stack, Button, useMediaQuery, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminEditForm from './AdminEditForm';
import { validateFields } from '../config/validation'; // Import validateFields function

export default function AdminLifeTile({ id, order, date, title, subtitle, text, deleteLifeXP, updateLifeXP }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isEditing, setIsEditing] = useState(false);

  const [editedOrder, setEditedOrder] = useState(order);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSubtitle, setEditedSubtitle] = useState(subtitle);
  const [editedText, setEditedText] = useState(text);

  const [errors, setErrors] = useState({});

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const newErrors = validateFields({
      order: editedOrder,
      date: editedDate,
      title: editedTitle,
      subtitle: editedSubtitle,
      text: editedText,
    }, false, true);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    updateLifeXP(id, editedOrder, editedDate, editedTitle, editedSubtitle, editedText);
    setIsEditing(false);
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
                  {date}
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
          date: editedDate,
          title: editedTitle,
          subtitle: editedSubtitle,
          text: editedText,
         }}
         isLifeXP={true}
         errors={errors}
          onChange={(name, value) => {
            switch (name) {
              case 'order':
                setEditedOrder(value);
                break;
              case 'date':
                setEditedDate(value);
                break;
              case 'title':
                setEditedTitle(value);
                break;
              case 'subtitle':
                setEditedSubtitle(value);
                break;
              case 'text':
                setEditedText(value);
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