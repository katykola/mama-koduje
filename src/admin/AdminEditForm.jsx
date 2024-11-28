import React from 'react';
import { Stack, Button, FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function AdminEditForm({
  fields,
  onChange,
  onSave,
  onCancel,
}) {
  return (
    <Stack spacing={2} sx={{ padding: '1rem', border: '1px solid var(--border-color)', backgroundColor: '#f7e6e6' }}>
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
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                  />
                )}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              label={field.label}
              id={field.name}
              value={field.value}
              onChange={(e) => onChange(field.name, e.target.value)}
              multiline={field.multiline}
              minRows={field.minRows}
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
          )}
        </FormControl>
      ))}
      <Stack direction='row' spacing={2} sx={{ justifyContent: 'end' }}>
        <Button onClick={onCancel} variant='outlined'>Zpět</Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          Uložit
        </Button>
      </Stack>
    </Stack>
  );
}