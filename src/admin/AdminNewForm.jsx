import React from 'react';
import { Box, Button, TextField, Stack, Typography, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrayField from './AdminArrayField';

export default function AdminNewForm({
  title,
  fields,
  errors,
  onChange,
  onSubmit,
  onCancel,
  existingTags, // Add existingTags prop
}) {
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
                <ArrayField
                  label={field.label}
                  values={field.value}
                  onChange={(newValue) => onChange(field.name, newValue)}
                  existingItems={existingTags} // Pass existingTags to ArrayField
                  isTagsField={field.name === 'tags'} // Pass isTagsField prop
                />
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
          <Button onClick={onSubmit} variant="contained">
            Uložit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}