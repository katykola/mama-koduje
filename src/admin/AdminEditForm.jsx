import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Stack, FormControl, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Rating } from '@mui/material';
import AdminArrayField from './AdminArrayField';
import { getFields } from '../config/formFields'; // Import getFields function
import QuillEditor from './QuillEditor';

export default function AdminEditForm({
  values,
  errors = {}, // Ensure errors is initialized as an empty object if not provided
  onChange,
  onSave,
  onCancel,
  existingTags, // Add existingTags prop
  isPost,
  isLifeXP
}) {

  const [image, setImage] = useState(values.image || null); // Initialize image state with current image
  const [newImage, setNewImage] = useState(null); // State for new image upload
  const [content, setContet] = useState(values.content || ''); // Initialize content state with current content 

  const fields = getFields(values, isPost, isLifeXP); // Generate fields array using getFields function

  useEffect(() => {
  }, [values, content]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setImage(imageUrl);
      onChange('image', imageUrl); // Update the parent component state with the new image URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Box sx={{ border: '1px solid var(--secondary-color)', p: 3, mb: 4, backgroundColor: '#f7e6e6' }}>
      <Stack spacing={5}>
        <Stack direction='column' spacing={3} sx={{ width: '100%' }}>
          {fields.map((field, index) => (
            <FormControl key={index} fullWidth>
              {field.type === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={field.label}
                    value={field.value}
                    onChange={(newValue) => {
                      onChange(field.name, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required={field.required}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : field.type === 'array' ? (
                <AdminArrayField
                  label={field.label}
                  values={field.value}
                  onChange={(newValue) => {
                    onChange(field.name, newValue);
                  }}
                  existingItems={existingTags}
                  isTagsField={field.name === 'tags'}
                  required={field.required}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              ) : field.name === 'content' ? (
                <QuillEditor
                  required={field.required}
                  label={field.label}
                  value={field.value}
                  name={field.name}
                  onChange={(name, newValue) => {
                    onChange(name, newValue);
                  }}
                  errors={errors}
                />
              ) : field.name === 'content_eng' ? (
                <QuillEditor
                  required={field.required}
                  label={field.label}
                  value={field.value}
                  name={field.name}
                  onChange={(name, newValue) => {
                    onChange(name, newValue);
                  }}
                  errors={errors}
                />
              ) : field.name === 'image' ? (
                <Box>
                  {image && (
                    <Box sx={{ mb: 2 }}>
                      <img src={image} alt="Current" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </Box>
                  )}
                  <TextField
                    type="file"
                    label={field.label}
                    name={field.name}
                    onChange={handleImageUpload}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                  />
                </Box>
              ) : field.type === 'number' ? (
                <TextField
                  required={field.required}
                  label={field.label}
                  id={field.name}
                  value={field.value}
                  onChange={(e) => {
                    onChange(field.name, Number(e.target.value));
                  }}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  type="number"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              ) : field.name === 'rating' ? (
                <FormControl fullWidth>
                  <Typography component="legend">{field.label}</Typography>
                  <Rating
                    name={field.name}
                    value={field.value}
                    onChange={(e) => {
                      onChange(field.name, Number(e.target.value));
                    }}
                  />
                  {errors[field.name] && (
                    <Typography variant="caption" color="error">
                      {errors[field.name]}
                    </Typography>
                  )}
                </FormControl>
              ) : (
                <TextField
                  required={field.required}
                  label={field.label}
                  id={field.name}
                  value={field.value}
                  onChange={(e) => {
                    onChange(field.name, e.target.value);
                  }}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  multiline={field.multiline}
                  minRows={field.minRows}
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              )}
            </FormControl>
          ))}
        </Stack>
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'end' }}>
          <Button onClick={onCancel} variant='outlined'>Cancel</Button>
          <Button onClick={onSave} variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}