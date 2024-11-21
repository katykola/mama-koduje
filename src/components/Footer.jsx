import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return(
        <Box sx={{ backgroundColor:'var(--secondary-color)', padding:'1rem'}}>
            <Typography variant="body1" align="center" sx={{ color: 'white' }}>@2024 Máma kóduje by <Link>KatyKola</Link>
            </Typography>
        </Box>
    )
}