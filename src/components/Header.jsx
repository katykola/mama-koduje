import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, useMediaQuery, FormControl, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Icons from './Icons';
import '/src/styles/styles.css'; 

const menuItems = [
  { text: 'Home', path: '/' },
  { text: 'Recenze', path: '/recenze' },
  { text: 'Ze života', path: '/clanky' },
  { text: 'O mě', path: '/o-me' },
];

const menuItemsEng = [
  { text: 'Home', path: '/eng' },
  { text: 'Reviews', path: '/reviews' },
  { text: 'Life', path: '/blog' },
  { text: 'About me', path: '/about-me' },
];

export default function Header() {
  const theme = useTheme(); 
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event) => {
   setLanguage(event.target.value);
   if(event.target.value === 'eng'){
     navigate('/eng');
   } else if(event.target.value === 'cs'){
    navigate('/');
   }
  }

  return (
    <>
    {isMobile ? null : (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor:'#FFEDED' }} >
        <Typography sx={{ fontSize: '1.2rem', fontFamily:'Inria Sans', fontWeight: '300', color: '#535353', letterSpacing:'2px', mt: '3rem' }}>
          {language === 'eng' ? 'REAL STORIES FROM MY JOURNEY TO BECOMING A PROGRAMMER.' : 'SDÍLÍM SVÉ REÁLNÉ ZKUŠENOSTI Z CESTY ZA POZICÍ PROGRAMÁTORKY.'}
        </Typography>
        <Typography sx={{ fontSize: '4rem', fontFamily: 'Inknut Antiqua', fontWeight: 600, my:'1rem'}}>
        {language === 'eng' ? 'Momma Codes' : 'Máma kóduje'}
        </Typography>
      </Box>
    )}  
    <AppBar position={isMobile ? 'fixed' : 'static'} sx={{ backgroundColor: '#FFEDED', boxShadow: 'none', borderTop: isMobile ? undefined : '1px solid #9C9C9C', borderBottom: '1px solid #9C9C9C', height: isMobile ? '4rem' : undefined }} >
      <Toolbar sx={{ width: '100%', justifyContent: 'center', py: 2 }} >
        {isMobile ? (
          <>
            <Typography style={{ flexGrow: 1 }} sx={{ fontFamily: 'Inknut Antiqua', fontWeight: 600, color:'#222222', fontSize: '1.4rem'}}>
              <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
              {language === 'eng' ? 'Momma Codes' : 'Máma kóduje'}
              </Link>
            </Typography>
            <Button variant='outlined' edge="start" color="inherit" aria-label="menu" sx={{ fontSize: '1rem' }} onClick={toggleDrawer(true)}>
              Menu
            </Button>
            <Drawer 
              anchor="right" 
              open={drawerOpen} 
              onClose={toggleDrawer(false)} 
              sx={{'& .MuiDrawer-paper': {width: '80%', backgroundColor: '#FFEDED'}}}
              >
              <Box sx={{ padding:'1rem', paddingBottom: 0, display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                  <FormControl variant="outlined" sx={{ minWidth: 60 }}>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0px', border: '1px solidrgb(106, 106, 106)' }, '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { py: '0.5rem' } }}
                      >
                      <MenuItem value='cs' onClick={toggleDrawer(false)}>cs</MenuItem>
                      <MenuItem value='eng' onClick={toggleDrawer(false)}>eng</MenuItem>
                    </Select>
                  </FormControl>
                <CloseOutlinedIcon onClick={toggleDrawer(false)} />
              </Box>
              <List sx={{ px: 1, pt: 2 }}>
                { language === 'eng' ? 
                  menuItemsEng.map((item, index) => (
                    <ListItem key={index} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))
                  :
                  menuItems.map((item, index) => (
                    <ListItem key={index} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))
                }
                  <Icons/>
              </List>            
            </Drawer>
          </>
        ) : (
          <>
            <Container maxWidth="md">
              <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                { language === 'eng' ?
                menuItemsEng.map((item, index) => (
                    <Typography key={index} variant="navItem" sx={{ height: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                      <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.text}
                      </Link>
                    </Typography>
                ))
                :
                menuItems.map((item, index) => (
                  <Typography key={index} variant="navItem" sx={{ height: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                    <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.text}
                    </Link>
                  </Typography>
                ))
                }
                <Icons/>
                <FormControl sx={{ minWidth: 60, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value='cs'>cs</MenuItem>
                    <MenuItem value='eng'>eng</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Container>
          </>
        )}
      </Toolbar>
    </AppBar>
    </>
  );
}

