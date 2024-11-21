import { Box, Typography, Link, Stack } from '@mui/material';

export default function PostTile( {imgSrc} ) {
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
                <Typography variant='tileTextSm' sx={{ marginBottom: '0.5rem' }}>24.5.2024 * 3 min čtení</Typography>
                <Typography variant="tileTitle"><Link>Jak se jako matka dobře vyspat</Link></Typography>
                <Typography variant='tileText'>Kurz od Moshe byl úplně prvním, který jsem absolovovala. Dle mého názoru poskytuje dobrou.</Typography>
                <Typography variant='tileTextSm' sx={{ mt: 2 }}>0 komentářů</Typography>
            </Box>

        </Stack>

        </>
    )               
} 