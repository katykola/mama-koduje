import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';


const menuItems = [
  { text: 'Odhlásit', path: '/admin' },
];

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
      <Toolbar sx={{ width: '100%', justifyContent: 'end' }} >
        {isMobile ? (
          <>
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
            <Button variant='outlined' color="inherit" onClick={handleLogout}>
              Odhlásit
            </Button>              
            </List>            
            </Drawer>
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Inknut Antiqua', fontWeight: 600, my:'1rem'}}>Máma kóduje</Typography>
            {menuItems.map((item, index) => (
                <Typography key={index} variant="navItem" sx={{ height: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                  <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.text}
                  </Link>
                </Typography>
            ))}
            <Button variant='contained' color="inherit" onClick={handleLogout}>
              Odhlásit
            </Button>          
            </>
        )}
      </Toolbar>
    </AppBar>
    </>
  );
}

