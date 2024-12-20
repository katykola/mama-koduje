import { Stack, Box } from "@mui/material";
import Auth from '../components/Auth';

export default function LoginPage(){

    return (
        <Box sx={{ maxHeight: '100vh', padding: 3 }}>
            <Stack
                direction="column"
                spacing={0}
                sx={{
                mt: 3,
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Auth/>
            </Stack>
        </Box>
    )
}