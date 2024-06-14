import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function FBuilderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered style={{backgroundColor:'gainsboro'}}>
        <Tab label="Questions" />
        <Tab label="Answers" />
        <Tab label="Edit" />
      </Tabs>
    </Box>
  );
}