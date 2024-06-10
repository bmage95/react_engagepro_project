import React from 'react';
import Box from './drag-drop';
import '../App.css';

const LconnectPointStyle = {
  position: 'absolute',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'black',
};

const LeftBox = ({ text, handler, addArrow, boxId}) =>
    (
  <Box
    text={text}
    handler={handler}
    addArrow={addArrow}
    boxId={boxId}
    connectPointStyle={LconnectPointStyle}
    connectPointClass="inside_button"
  />
    );
export default LeftBox;
