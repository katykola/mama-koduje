import { useMediaQuery, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useLanguage } from '../contexts/LanguageContext';


export default function Icons() {
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { language } = useLanguage();
    
    return(
        <Stack direction='row' spacing={2} sx={{ justifyContent: 'center', pt: isMobile? 2 : null }}>
        {language === 'eng' ? null :
        <IconButton 
            aria-label="instagram"
            component="a"
            href="https://www.instagram.com/katy.koduje/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <InstagramIcon />
        </IconButton>
        }
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