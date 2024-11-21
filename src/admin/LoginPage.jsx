import { Stack } from "@mui/material";
import Auth from '../components/Auth';

export default function LoginPage(){

    return (
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
    )
}