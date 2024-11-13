import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    navItem: {
      fontFamily: 'Inria Sans, sans-serif',
      fontWeight: 300,
      color: '#535353',
    },
    h1: {
      fontFamily: 'Inria Serif, serif',
      fontWeight: 700,
      fontSize: '2.2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.8rem',
      lineHeight: 1.2,
    },
    sectionTitle: {
      fontFamily: 'var(--font-family-secondary)',
      fontSize: '1.2rem',
      color: '#7e7e7e',
      fontWeight: 100,
      textTransform: 'uppercase',     
    },
    tileTitle: {
      fontSize: '1rem', 
      fontFamily:'var(--font-family)', 
      fontWeight: '600', 
      textDecoration:'underline', 
      color: 'var(--tertiary-color)', 
      mt: '1rem'
    },
    author: {
      fontSize: '0.9rem', 
      fontFamily:'var(--font-family)', 
      fontWeight: '200', 
      color: 'var(--secondary-color)'
    },  
    tileText: {
      fontSize:'0.85rem', 
      marginTop: '1rem',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 200,
      color: '#222222',
    },
    tileTextSm: {
      fontSize: '0.8rem', 
      fontFamily:'var(--font-family-secondary)', 
      fontWeight: '200', 
      color: 'var(--secondary-color)'
    },  
    body1: {
        fontFamily: 'var(--font-family)',
        fontWeight: 200,
        color: 'var(--tertiary-color)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          fontFamily: 'Inria Sans, sans-serif',
          fontWeight: 300,
          color: '#535353',
          borderColor: '#535353',
          borderRadius: '0',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#535353',
            backgroundColor: '#535353',
            color: 'white',
          },
        },
        contained: {
          fontFamily: 'Inria Sans, sans-serif',
          fontWeight: 300,
          color: 'white',
          backgroundColor: 'var(--tertiary-color)',
          borderRadius: '0',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#535353',
            backgroundColor: '#535353',
            color: 'white',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          color: 'inherit',
          textDecorationColor: 'inherit',
          '&:hover': {
            color: '#222222',
          },
        },
      },
    },
  },
});

export default theme;
