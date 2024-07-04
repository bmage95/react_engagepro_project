import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel, { a11yProps } from '../../components/tab_panel';
import AppBar from '../../components/appbar'
import OpenAiChat from "./AI_chat.jsx";

const TTBuilder = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <div className='ttbuilder'>
      <AppBar/>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor:'green', backgroundColor:'gainsboro' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Questions" {...a11yProps(0)} />
            <Tab label="Preview" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <p>hi</p>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <OpenAiChat/>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default TTBuilder
