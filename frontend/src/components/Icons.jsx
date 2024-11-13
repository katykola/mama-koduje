import { Stack, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Icons() {
    return(
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center',  borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <IconButton aria-label="instagram">
            <InstagramIcon />
        </IconButton>
        <IconButton aria-label="linkedIn">
            <LinkedInIcon />
        </IconButton>
        <IconButton aria-label="github">
            <GitHubIcon />
        </IconButton>
    </Stack>
    )
}