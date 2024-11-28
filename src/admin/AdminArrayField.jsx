import React, { useState } from 'react';
import { Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function ArrayField({ label, values, onChange, existingItems, isTagsField }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '' && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue('');
      setErrorMessage('');
    } else if (values.includes(inputValue.trim())) {
      setErrorMessage('Tento štítek již existuje');
    }
  };

  const handleAddExisting = (item) => {
    if (!values.includes(item)) {
      onChange([...values, item]);
      setErrorMessage('');
    } else {
      setErrorMessage('Tento štítek již existuje');
    }
  };

  const handleRemove = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
    setErrorMessage('');
  };

  const handleEdit = (index, newValue) => {
    const newValues = values.map((value, i) => (i === index ? newValue : value));
    onChange(newValues);
  };

  if (isTagsField) {
    return (
      <Stack spacing={2}>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          {existingItems.map((item, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleAddExisting(item)}
              disabled={values.includes(item)}
              sx={{ margin: '0.5rem' }}
            >
              {item}
            </Button>
          ))}
          <TextField
            label='Nový štítek'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <Button onClick={handleAdd} variant="outlined" startIcon={<Add />}>
            Přidat
          </Button>
        </Stack>
        <Stack direction='row' spacing={1} justifyContent='start'>
          {values.map((value, index) => (
            <TextField
              key={index}
              value={value}
              onChange={(e) => handleEdit(index, e.target.value)}
              sx={{ backgroundColor: 'var(--tertiary-color)', borderRadius: '0', width: 'fit-content' }}
              InputProps={{
                style: { color: 'white' }, // Set text color to white
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginLeft: '0.5rem' }}>
                    <IconButton onClick={() => handleRemove(index)} sx={{ color: 'white' }}>
                      <Remove />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <TextField
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '5px', flexGrow: 1 }}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button onClick={handleAdd} variant="outlined" startIcon={<Add />}>
          Přidat
        </Button>
      </Stack>
      <Stack spacing={1} justifyContent='start'>
        {values.map((value, index) => (
          <TextField
            key={index}
            value={value}
            InputProps={{
              readOnly: true,
            //   style: { color: 'white' }, // Set text color to white
              endAdornment: (
                <InputAdornment position="end" sx={{ marginLeft: '0.5rem' }}>
                  <IconButton onClick={() => handleRemove(index)} sx={{ color: 'black' }}>
                    <Remove />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ color: 'white', backgroundColor: 'var(--primary-color)', border: '1px solid var(--secondary-color)', borderRadius: '5px', flexGrow: 1 }}
          />
        ))}
      </Stack>
    </Stack>
  );
}