import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const menuItems = [
  { text: 'Home', path: '/' },
  { text: 'Recenze', path: '/recenze' },
  { text: 'Ze života', path: '/ze-zivota' },
  { text: 'O mě', path: '/o-me' },
  { text: 'Kontakt', path: '/kontakt' },
  { text: 'Post', path: '/post' },
  { text: 'Dark Mode' },
];

export default function Header() {
  const theme = useTheme(); // Use the theme and media query to determine if the screen size is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  return (
    <>
    {isMobile ? null : (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor:'#FFEDED' }} >
        <Typography sx={{ fontSize: '1.2rem', fontFamily:'Inria Sans', fontWeight: '300', color: '#535353', letterSpacing:'2px', mt: '3rem' }}>SDÍLÍM SVÉ REÁLNÉ ZKUŠENOSTI Z CESTY ZA POZICÍ PROGRAMÁTORKY.</Typography>
        <Typography sx={{ fontSize: '4rem', fontFamily: 'Inknut Antiqua', fontWeight: 600, my:'1rem'}}>Máma kóduje</Typography>
      </Box>
    )}  
    <AppBar position="static" sx={{ backgroundColor: '#FFEDED', boxShadow: 'none', borderTop: isMobile ? undefined : '1px solid #9C9C9C', borderBottom: '1px solid #9C9C9C' }} >
      <Toolbar sx={{ width: '100%', justifyContent: 'center' }} >
        {isMobile ? (
          <>
            <Typography style={{ flexGrow: 1 }} sx={{ fontFamily: 'Inknut Antiqua', fontWeight: 600, color:'#222222'}}>
              Máma kóduje
            </Typography>
            <Button variant='outlined' edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              Menu
            </Button>
            <Drawer 
              anchor="right" 
              open={drawerOpen} 
              onClose={toggleDrawer(false)} 
              sx={{'& .MuiDrawer-paper': {width: '80%', backgroundColor: '#FFEDED'}}}
              >
              <Box sx={{ padding:'1rem', display:'flex', justifyContent:'space-between' }}>
                <DarkModeOutlinedIcon/>
                <CloseOutlinedIcon onClick={toggleDrawer(false)} />
              </Box>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button key={index} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>            
            </Drawer>
          </>
        ) : (
          <>
            {menuItems.map((item, index) => (
                <Typography key={index} variant="navItem" sx={{ height: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                  <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.text}
                  </Link>
                </Typography>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
    </>
  );
}
