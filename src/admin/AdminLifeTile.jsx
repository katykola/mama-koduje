import React, { useState } from 'react';
import { Box, Typography, Link, Stack, Button, useMediaQuery, FormControl, InputLabel, Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function AdminLifeTile({ id, order, date, title, subtitle, text, deleteLifeXP, updateLifeXP }) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isEditing, setIsEditing] = useState(false);

  const [editedOrder, setEditedOrder] = useState(order);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSubtitle, setEditedSubtitle] = useState(subtitle);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateLifeXP(id, editedOrder, editedDate, editedTitle, editedSubtitle, editedText);
    setIsEditing(false);
  };

  return (
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
                width: '2rem', // Set width to make it round
                height: '2rem', // Set height to make it round
                borderRadius: '50%', // Make the box round
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
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Editovat
          </Button>
          <Button onClick={() => deleteLifeXP(id)} variant="outlined" color="primary">
            Vymazat
          </Button>
        </Stack>
      </Stack>

      {isEditing && (
        <Stack spacing={2} sx={{ padding: '1rem' }}>
          <FormControl>
            <InputLabel htmlFor="order">Order</InputLabel>
            <Input
              id="order"
              value={editedOrder}
              onChange={(e) => setEditedOrder(Number(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input
              id="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="subtitle">Subtitle</InputLabel>
            <Input
              id="subtitle"
              value={editedSubtitle}
              onChange={(e) => setEditedSubtitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="text">Text</InputLabel>
            <Input
              id="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </FormControl>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Stack>

      )}
    </Stack>
  );
}