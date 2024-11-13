import { Box, Container } from '@mui/material';

export default function Wrapper({ children }) {
    return (
        <>
        <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="md">
            {children}
        </Container>
        </Box>
        </>
    )
}