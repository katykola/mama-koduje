import { Box, Typography, Link, Stack } from '@mui/material';

export default function LifeTile({imgSrc}) {
    return(

        <Stack direction='column' sx={{ }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', textAlign: 'left', backgroundColor:'#FFEDED', padding: '2rem', border: '1px solid var(--border-color)' }} >
                <Stack direction='row' spacing={1} sx={{ alignItems: 'baseline', justifyContent:'center' }}>
                    <Box
                        sx={{
                            top: '1.5rem',
                            left: '1.5rem',
                            backgroundColor: 'var(--tertiary-color)',
                            width: '2rem', // Set width to make it round
                            height: '2rem', // Set height to make it round
                            borderRadius: '50%', // Make the box round
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        >
                        <Typography variant='tileTextSm' sx={{ color: 'white', padding: '0.5rem', fontSize: '1rem' }}>1</Typography>
                    </Box>
                    <Typography variant='body1' sx={{ marginBottom: '0.5rem' }}>duben 2023</Typography>
                </Stack>
                <Typography variant="tileTitle" sx={{ marginTop: '1rem' }}><Link>The Ultimate HTML5&CSS3 Series</Link></Typography>
                <Typography variant='tileText'>Malá Ema má čerstvě 3 měsíce. Role matky pro mě bylo jako hození do vody. Kurz mě drží v jakžtakž psychiké pohodě. Pracuju ve chvílích, když na mě malá spí v nosítku. Potím se a bolí mě záda. Ale stojí to za to!</Typography>
            </Box>
          
            <Box
            sx={{
            position: "relative" ,
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
                {/* <Box
                    position="absolute"
                    sx={{
                        top: '1.5rem',
                        left: '1.5rem',
                        backgroundColor: 'var(--tertiary-color)',
                        width: '2.5rem', // Set width to make it round
                        height: '2.5rem', // Set height to make it round
                        borderRadius: '50%', // Make the box round
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    <Typography variant='tileTextSm' sx={{ color: 'white', padding: '0.5rem', fontSize: '1.2rem' }}>1</Typography>
                </Box> */}
            </Box>

        </Stack>
    )
}