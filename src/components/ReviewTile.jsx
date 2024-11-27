import { Box, Stack, Typography, Rating, Link } from "@mui/material";

export default function ReviewTile({ id, title, author, perex, tags, rating, onPostSelect }) {
    
    return(
        <>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', textAlign: 'left', backgroundColor:'#FFEDED', padding: '2rem', border: '1px solid var(--border-color)' }} >
             <Stack direction='row' spacing={1}>
            {tags.map((tag, i) => (
                    <Typography key={i} sx={{ fontSize: '1rem', fontFamily:'Inria Sans', fontWeight: '300', color: 'white', backgroundColor:'var(--secondary-color)', p: '0.5rem' }}>{tag}</Typography>
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
                my: '1rem'
                }}  
            />            
            <Typography onClick={onPostSelect} variant="tileTitle"><Link>{title}</Link></Typography>
            <Typography variant="author">{author}</Typography>
            <Typography variant="tileText">{perex}</Typography>
        </Box>
        </>
    )
}