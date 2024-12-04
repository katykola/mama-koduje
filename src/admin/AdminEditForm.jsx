import React from 'react';
import { Box, Button, TextField, Stack, Typography, FormControl } from '@mui/material';
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

  const fields = getFields(values, isPost, isLifeXP); // Generate fields array using getFields function

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
                  existingItems={existingTags} // Pass existingTags to ArrayField
                  isTagsField={field.name === 'tags'} // Pass isTagsField prop
                  isPost = {isPost}
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
              ) : field.type === 'number' ? (
                <TextField
                  required={field.required}
                  label={field.label}
                  id={field.name}
                  value={field.value}
                  onChange={(e) => onChange(field.name, Number(e.target.value))} // Convert to number
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
                    onChange={(e) => onChange(field.name, Number(e.target.value))} // Convert to number
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
          <Button onClick={onCancel} variant='outlined'>Zpět</Button>
          <Button onClick={onSave} variant="contained">
            Uložit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}