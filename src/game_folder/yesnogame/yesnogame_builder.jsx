import React, { useState, useEffect } from 'react';
import AppBar from '../../components/appbar';
import QState from './question_state';
import YesNoPreviewPage from './yesnopreview_page';
import YesNoGameLoad from './yesnogame_load';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel, { a11yProps } from '../../components/tab_panel';

const YesNoGameBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className='yesno_builder'>
      <AppBar />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'green', backgroundColor: 'gainsboro' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Questions" {...a11yProps(0)} />
            <Tab label="Preview" {...a11yProps(1)} />
            <Tab label="Load/Share" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <QState addQuestion={addQuestion} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <YesNoPreviewPage questions={questions} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <YesNoGameLoad questions={questions} />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default YesNoGameBuilder;
