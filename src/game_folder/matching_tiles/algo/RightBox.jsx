import React from 'react';
import Box from './drag-drop';
import '../App.css';

const RconnectPointStyle = {
  position: 'absolute',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'black',
};

const RightBox = ({ text, handler, addArrow, boxId , lineCount, setLineCount}) => (
  <Box
    text={text}
    handler={handler}
    addArrow={addArrow}
    boxId={boxId}
    connectPointStyle={RconnectPointStyle}
    connectPointClass="inside_button"
    lineCount={lineCount}
    setLineCount={setLineCount}
  />
);

export default RightBox;
