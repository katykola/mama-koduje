import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminHeader from './AdminHeader';
import AdminLifePage from './AdminLifePage';
import AdminPostsPage from './AdminPostsPage';
import { Stack, Typography, Button } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Stack>
      <AdminHeader/>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Životní zkušenosti" {...a11yProps(0)} />
            <Tab label="Posty" {...a11yProps(1)} />
            <Tab label="Recenze" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box sx={{maxWidth: '1280px', m: '0 auto'}}>
          <CustomTabPanel value={value} index={0}>
            <AdminLifePage/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AdminPostsPage />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </Stack>
    </>
  );
}