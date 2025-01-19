import React, { useState } from 'react';
import { Box, Button, TextField, Stack, FormControl, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Rating } from '@mui/material';
import AdminArrayField from './AdminArrayField';
import QuillEditor from './QuillEditor';

export default function AdminNewForm({
  title,
  fields,
  errors,
  onChange,
  onSubmit,
  onCancel,
  existingTags,
}) {
  
  const [newImage, setNewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    onChange('image', file);
  };

  return (
    <Box sx={{ border: '1px solid var(--secondary-color)', p: 3, mb: 4, backgroundColor: '#f7e6e6' }}>
      <Stack spacing={5}>
        <Typography variant='h5'>{title}</Typography>
        <Stack direction='column' spacing={3} sx={{ width: '100%' }}>
          {fields.map((field, index) => (
            <FormControl key={index} fullWidth>
              {field.type === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={field.label}
                    value={field.value}
                    onChange={(newValue) => onChange(field.name, newValue)}
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
                  onChange={(newValue) => onChange(field.name, newValue)}
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
                  onChange={onChange}
                  errors={errors}
                />

              ) : field.name === 'content_eng' ? (
                <QuillEditor
                  required={field.required}
                  label={field.label}
                  value={field.value}
                  name={field.name}
                  onChange={onChange}
                  errors={errors}
                />
                
              ) : field.name === 'image' ? (
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
              ) : field.type === 'number' ? (
                <TextField
                  required={field.required}
                  label={field.label}
                  id={field.name}
                  value={field.value}
                  onChange={(e) => onChange(field.name, Number(e.target.value))}
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
                    onChange={(e) => onChange(field.name, Number(e.target.value))}
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
                  onChange={(e) => onChange(field.name, e.target.value)}
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
          <Button onClick={onSubmit} variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}