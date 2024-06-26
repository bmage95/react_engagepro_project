import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './yesnopreview_page.scss'

const YesNoPreviewPage = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => ({...prevAnswers, [currentQuestionIndex]: answer }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div>
      {questions.length === 0? (
        <h2>No questions added yet.</h2>
      ) : (
        <div>
          {currentQuestionIndex < questions.length ? (
            <div className='preview_yesno2'>
                <h5>Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</h5>

                <div  className='preview_yesno'>
                    <div className='no' onClick={() => handleAnswer('No')}><p>No</p></div>
                    <div className='yes' onClick={() => handleAnswer('Yes')}><p>Yes</p></div>
                </div>
            </div>
            ) : (
            <p>You've answered all questions!</p>
            )}
        </div>
      )}
    </div>
  );
};

YesNoPreviewPage.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default YesNoPreviewPage;