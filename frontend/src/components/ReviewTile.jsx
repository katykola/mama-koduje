import { useState } from "react";
import { Box, Typography, Rating, Link } from "@mui/material";

export default function ReviewTile({ review }) {
    const [value, setValue] = useState(2);    
    
    return(
        <>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', textAlign: 'left', backgroundColor:'#FFEDED', padding: '2rem', border: '1px solid var(--border-color)' }} >
            <Typography sx={{ fontSize: '1rem', fontFamily:'Inria Sans', fontWeight: '300', color: 'white', backgroundColor:'var(--secondary-color)', p: '0.5rem' }}>html&css</Typography>
            <Rating
                name="read-only"
                value={value}
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
            <Typography variant="tileTitle"><Link>The Ultimate HTML5&CSS3 Series</Link></Typography>
            <Typography variant="author">Code With Mosh</Typography>
            <Typography variant="tileText">Kurz od Moshe byl úplně prvním, který jsem absolovovala. Dle mého názoru poskytuje dobrou představu o tom.</Typography>
        </Box>
        </>
    )
}