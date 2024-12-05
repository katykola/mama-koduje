import { Stack, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Icons() {
    return(
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
        <IconButton 
            aria-label="instagram"
            component="a"
            href="https://www.instagram.com/katy.koduje/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <InstagramIcon />
        </IconButton>
        <IconButton 
            aria-label="linkedIn"
            component="a"
            href="https://www.linkedin.com/in/katerinakolar/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <LinkedInIcon />
        </IconButton>
        <IconButton 
            aria-label="github"
            component="a"
            href="https://github.com/katykola"
            target="_blank"
            rel="noopener noreferrer"
        >
            <GitHubIcon />
        </IconButton>
    </Stack>
    )
}