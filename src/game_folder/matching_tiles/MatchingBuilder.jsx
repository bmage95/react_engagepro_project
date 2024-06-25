import React, { useState } from 'react';
import AppBar from '../../components/appbar';
import QuestionEditor from './App';
import MatchingPreview from './Preview_matching';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';                           
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
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

const MatchingBuilder = () => {
    const [formContent, setFormContent] = useState([]);
    const [formTitle, setFormTitle] = useState("");
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor:'green', backgroundColor:'gainsboro' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Questions" {...a11yProps(0)} />
                        <Tab label="Preview" {...a11yProps(1)} />
                        <Tab label="In Progress" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <QuestionEditor
                        formTitle={formTitle}
                        setFormTitle={setFormTitle}
                        formContent={formContent}
                        setFormContent={setFormContent}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <MatchingPreview formContent={formContent} formTitle={formTitle} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <h1>In Progress</h1>
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default MatchingBuilder;
