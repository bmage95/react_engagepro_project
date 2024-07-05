import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel, { a11yProps } from '../../components/tab_panel';
import AppBar from '../../components/appbar'
import OpenAiChat2 from './AI_chat2';
import TestManagement from './components/management/TestManagement.tsx';
import Test from './components/management/Test.tsx';


const PTBuilder = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <div className='ptbuilder'>
      <AppBar/>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor:'green', backgroundColor:'gainsboro' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Questions" {...a11yProps(0)} />
            <Tab label="Preview" {...a11yProps(1)} />
            <Tab label="AI chat" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TestManagement />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Test />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <OpenAiChat2/>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default PTBuilder
