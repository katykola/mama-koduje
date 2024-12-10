import { useEffect, useRef } from 'react';
import { Typography, FormControl } from '@mui/material';

import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill stylesheet
import '../styles/quill-custom.css'; // Import custom Quill stylesheet

export default function QuillEditor({ value, onChange, label, name, errors }) {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      const Font = Quill.import('formats/font');
      Font.whitelist = ['Inter', 'sans-serif'];
      Quill.register(Font, true);

      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '2' }, { 'header': '3' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      });

      // Set the initial content value
      if (value) {
        quillInstance.current.root.innerHTML = value;
      }

      quillInstance.current.root.style.fontFamily = 'Inter';

      quillInstance.current.on('text-change', () => {
        const content = quillInstance.current.root.innerHTML;
        onChange(name, content); // Pass the name and content to the onChange function
      });
    }
  }, [onChange, value, name]);

  // Update the editor content when the value prop changes
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <FormControl fullWidth>
      <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
      <div ref={quillRef} style={{ height: '200px', backgroundColor: 'white' }} />
      {errors[name] && (
        <Typography variant="caption" color="error">
          {errors[name]}
        </Typography>
      )}
    </FormControl>
  );
}