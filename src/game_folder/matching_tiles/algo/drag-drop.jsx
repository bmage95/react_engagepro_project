import React, { useState, useRef } from 'react';
import Xarrow from 'react-xarrows';

const connectPointOffset = {
  left: { left: 0, top: '50%', transform: 'translate(-50%, -50%)' },
  right: { left: '100%', top: '50%', transform: 'translate(-50%, -50%)' },
  top: { left: '50%', top: 0, transform: 'translate(-50%, -50%)' },
  bottom: { left: '50%', top: '100%', transform: 'translate(-50%, -50%)' },
};

const ConnectPointsWrapper = ({ boxId, handler, ref0, connectPointStyle, connectPointClass }) => {
  const ref1 = useRef();
  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <React.Fragment>
      <div
        className={`connectPoint ${connectPointClass}`}
        style={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position,
          cursor: 'move',
        }}
        draggable
        onDragStart={(e) => {
          setBeingDragged(true);
          e.dataTransfer.setData('arrow', boxId);
        }}
        onDrag={(e) => {
          setPosition({
            position: 'fixed',
            left: e.clientX,
            top: e.clientY,  
            transform: 'none',
            opacity:0,
          });
          ref1.current.style.left = `${e.clientX}px`; 
          ref1.current.style.top = `${e.clientY}px`; 
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setPosition({});
          setBeingDragged(false);
        }}
      />
      {beingDragged ? <Xarrow start={ref0} end={ref1} strokeWidth={2.8} color='green'/> : null}
    </React.Fragment>
  );
};

const Box = ({ text, handler, addArrow, boxId, connectPointStyle, connectPointClass }) => {
  const ref0 = useRef();
  const [matchedPairs, setMatchedPairs] = useState(new Set());

  

  const handleDrop = (e) => {
    const startId = e.dataTransfer.getData('arrow');
    if (startId && startId !== boxId) {
      // Check for matching pairs
      if((startId === '7' && boxId === '1') ||
      (startId === '6' && boxId === '2') ||
      (startId === '8' && boxId === '3') ||
      (startId === '5' && boxId === '4')){
        alert("MATCH ONLY left -> right");
      }
      else if ((startId === '1' && boxId === '7') ||
          (startId === '2' && boxId === '6') ||
          (startId === '3' && boxId === '8') ||
          (startId === '4' && boxId === '5')) {
        const pair = [startId, boxId].sort(); 
        if (!matchedPairs.has(pair.toString())) { 
          addArrow({ start: startId, end: boxId });
          setMatchedPairs(new Set(matchedPairs.add(pair.toString()))); 
        }
      }
      else {
        window.alert("Incorrect Match");
      }
    }
  };

  return (
    <div
      id={boxId}
      ref={ref0}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {text}
      <ConnectPointsWrapper {...{ boxId, handler, ref0, connectPointStyle, connectPointClass, addArrow }} />
    </div>
  );
};

export default Box;
