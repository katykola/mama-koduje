import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';


export default function AdminHeader() {
  const theme = useTheme(); // Use the theme and media query to determine if the screen size is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth'); // Redirect to login page after logout
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#FFEDED', boxShadow: 'none', borderTop: isMobile ? undefined : '1px solid #9C9C9C', borderBottom: '1px solid #9C9C9C' }} >
        {isMobile ? (
          <Toolbar sx={{ width: '100%', justifyContent: 'end' }} >
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
            <Button variant='outlined' color="inherit" onClick={handleLogout}>
              Odhlásit
            </Button>              
            </Drawer>
          </Toolbar>
        ) : (
            <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }} >
              <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Inknut Antiqua', fontWeight: 600, my:'1rem'}}>Máma kóduje</Typography>
              <Button variant='contained' color="inherit" onClick={handleLogout}>
                Odhlásit
              </Button>
            </Toolbar>
        )}
    </AppBar>
    </>
  );
}

