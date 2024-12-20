import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return(
        <Box sx={{ backgroundColor:'var(--secondary-color)', padding:'1rem', mt: 2}}>
            <Typography variant="body1" align="center" sx={{ color: 'white' }}>
            @2024 Máma kóduje by <Link href="https://github.com/katykola/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontWeight: 'bolder', textDecoration: 'underline' }}>KatyKola</Link>
            </Typography>
        </Box>
    )
}