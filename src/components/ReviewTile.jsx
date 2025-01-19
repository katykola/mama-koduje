import { Box, Stack, Typography, Rating, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from "../contexts/LanguageContext";

export default function ReviewTile({ title, urlTitle, author, perex, tags, rating }) {
  const { language } = useLanguage();

  return (
    <>
      <Box sx={{border: '1px solid var(--border-color)' }} >
      <Link component={RouterLink} to={ language === 'eng' ?  `/reviews/${urlTitle}` : `/recenze/${urlTitle}`} >
      <Box sx={{  padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', textAlign: 'left' }} >
        <Stack direction='row' spacing={1} sx={{  mb: '1rem' }}>
          {tags.map((tag, id) => (
            <Typography key={id} sx={{ fontSize: '1rem', fontFamily:'Inria Sans', fontWeight: '300', color: 'white', backgroundColor:'var(--secondary-color)', p: '0.5rem' }}>{tag}</Typography>
          ))}
        </Stack>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'var(--tertiary-color)', 
            },
            '& .MuiRating-iconHover': {
              color: 'var(--tertiary-color)', 
            },
            mt: '1rem',
            mb: '0.5rem'
          }}  
        />
        <Typography variant="tileTitle">{title}</Typography>
        <Typography variant="author">{author}</Typography>
        <Typography variant="tileText" style={{ mt: '1rem' }}>{perex}</Typography>
      </Box>
        </Link>
        </Box>
    </>
  );
}