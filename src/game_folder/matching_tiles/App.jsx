import React, { useState, useEffect } from 'react';
import Xarrow from 'react-xarrows';
import './App.css';
import LeftBox from './algo/LeftBox';
import RightBox from './algo/RightBox';

const App = () => {
  const [arrows, setArrows] = useState([]);
  const [x, setX] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstTimeModalVisible, setFirstTimeModalVisible] = useState(true);
  const [images, setImages] = useState({}); // Object to store images for each box
  const [numRows, setNumRows] = useState(2); // Initial number of rows

  useEffect(() => {
    const hasSeenModalBefore = localStorage.getItem('hasSeenModalBefore');
    if (!hasSeenModalBefore) {
      setFirstTimeModalVisible(true);
    }
  }, []);

  const formContent = [
    { type: 'text', label: 'Question 1', value: 'What is your name?' },
    { type: 'image', label: 'Image 1', src: 'https://example.com/image1.jpg', alt: 'Example Image' }
  ];
  

  const handleImage = (e, boxId) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => ({
        ...prevImages,
        [boxId]: URL.createObjectURL(file),
      }));
    }
  };

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
    setX(x + 1);
  };

  const HandleSubmit = () => {
    if (x === numRows - 1) {
      setModalVisible(true);
    } else {
      alert('Please match all the tiles.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    window.location.reload();
  };

  const closeFirstTimeModal = () => {
    setFirstTimeModalVisible(false);
    localStorage.setItem('hasSeenModalBefore', true);
  };

  const addRow = () => {
    if (numRows < 10) {
      setNumRows(numRows + 1);
    } else {
      alert('Maximum number of rows reached (10).');
    }
  };

  return (
    <div className="App">
      <h2 className="matching_game_header">Matching Game Builder🪛</h2>
      <br /><br /><br />
      <div className="table-container">
        <table>
          <tbody>
            {[...Array(numRows)].map((_, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="Left">
                    <button className="outside_button" type="button">
                      <input className="value_inside" />
                      <LeftBox {...{ addArrow, handler: 'right', boxId: `${index * 2 + 1}` }} />
                    </button>
                  </td>
                  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
                  <td className="Right">
                    <button className="outside_button" type="button">
                      <div className="value_inside">
                        <input type="file" onChange={(e) => handleImage(e, `${index * 2 + 2}`)} />
                        <img src={images[`${index * 2 + 2}`]} className="match" alt="" />
                      </div>
                      <RightBox {...{ addArrow, handler: 'left', boxId: `${index * 2 + 2}` }} />
                    </button>
                  </td>
                </tr>
                <br />
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {arrows.map((ar) => (
          <Xarrow start={ar.start} end={ar.end} key={ar.start + '-' + ar.end} strokeWidth={3} color="green" />
        ))}
      </div>
      <footer>
        <p>hint: 1-7, 2-6, 3-8, 4-5</p>
        <div className="botbar">
          <button type="button" onClick={HandleSubmit}>
            Submit!
          </button>
          <button type="button" onClick={addRow}>
            Add Row
          </button>
        </div>
      </footer>

      <div id="myModal" className={`modal ${modalVisible ? '' : 'modal-hidden'}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <p>Good Job!</p>
          <img className="match" src={require('./assets/elbato.png')} alt="batmans" />
        </div>
      </div>

      <div id="firstTimeModal" className={`modal ${firstTimeModalVisible ? '' : 'modal-hidden'}`}>
        <div className="modal-content">
          <span className="close" onClick={closeFirstTimeModal}>&times;</span>
          <br />
          <p>Welcome to the Matching Game!</p>
          <p>
            please <div className="instr_style1">drag and drop</div>
            <br />
            the circles to its closest match
          </p>
          <span>(left to right)</span>
        </div>
      </div>
    </div>
  );
};

export default App;
