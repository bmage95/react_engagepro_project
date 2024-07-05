import React, { useState, useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel, { a11yProps } from '../../components/tab_panel';
import AppBar from '../../components/appbar';
import OpenAiChat from "./AI_chat.jsx";
import TriviaBuilder from './TT_maker.tsx';
import TriviaPreview from './TT_preview.jsx';
import { UserContext } from '../../UserContext';

const TTBuilder = () => {
    const [value, setValue] = useState(0);
    const [questions, setQuestions] = useState([]); 
    const { profile } = useContext(UserContext); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='ttbuilder'>
            <AppBar />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'green', backgroundColor: 'gainsboro' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Questions" {...a11yProps(0)} />
                        <Tab label="Preview" {...a11yProps(1)} />
                        <Tab label="AI chat" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TriviaBuilder profile={profile} setQuestions={setQuestions} /> 
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TriviaPreview questions={questions} /> 
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <OpenAiChat />
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default TTBuilder;
