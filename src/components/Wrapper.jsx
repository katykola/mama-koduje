import { Box, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Wrapper({ children }) {

    const theme = useTheme(); // Use the theme and media query to determine if the screen size is mobile
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
        <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: 'calc(100vh - 64px)', py: {xs: 12, sm: 12, md: 6}, px: {xs: 2} }}>
        <Container maxWidth="md">
            {children}
        </Container>
        </Box>
        </>
    )
}