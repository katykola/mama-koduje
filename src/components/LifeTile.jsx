import { Box, Typography, Link, Stack } from '@mui/material';

export default function LifeTile({ order, date, title, subtitle, text}) {
    return(

        <Stack direction='column' sx={{ }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', backgroundColor:'#FFEDED', padding: '2rem', border: '1px solid var(--border-color)' }} >
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
                        <Typography variant='tileTextSm' sx={{ color: 'white', padding: '0.5rem', fontSize: '1rem'}}>{order}</Typography>
                    </Box>
                    <Typography variant='body1' sx={{ marginBottom: '0.5rem' }}>{date}</Typography>
                </Stack>
                <Typography variant="tileTitle" sx={{ marginTop: '1rem' }}><Link>{title}</Link></Typography>
                <Typography variant="author" sx={{ marginTop: '1rem' }}>{subtitle}</Typography>
                <Typography variant='tileText'>{text}</Typography>
            </Box>

        </Stack>
    )
}