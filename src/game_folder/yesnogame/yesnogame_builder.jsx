import React, { useState, useEffect } from 'react';
import AppBar from '../../components/appbar';
import QState from './question_state';
import YesNoPreviewPage from './yesnopreview_page';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Questions" {...a11yProps(0)} />
            <Tab label="Preview" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <QState addQuestion={addQuestion} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <YesNoPreviewPage questions={questions} />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default YesNoGameBuilder;
