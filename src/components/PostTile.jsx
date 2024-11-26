import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link, Stack } from '@mui/material';

export default function PostTile( { id, date, title, imgSrc, perex} ) {

  const navigate = useNavigate();

  const dateObject = date.toDate();

  const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handlePostSelect = () => {
    navigate(`/post/${id}`);
  };

    return(
        <>

        <Stack direction='row' sx={{ }}>
          
            <Box
            sx={{
              width: '100%', 
              minWidth: '200px',
              p: 0, 
              overflow: 'hidden', 
            }}
             >
            <Box 
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Maintain aspect ratio and cover the area
                objectPosition: 'top', // Align the top part of the image with the top of the container
              }}
              alt="placeholder"
              src={imgSrc}
            />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', textAlign: 'left', backgroundColor:'#FFEDED', padding: '2rem', border: '1px solid var(--border-color)' }} >
                <Typography variant='tileTextSm' sx={{ marginBottom: '0.5rem' }}>{formattedDate}</Typography>
                <Typography variant="tileTitle"><Link onClick={handlePostSelect}>{title}</Link></Typography>
                <Typography variant='tileText' sx={{overflow: 'hidden'}}>{perex}</Typography>
            </Box>

        </Stack>

        </>
    )               
} 