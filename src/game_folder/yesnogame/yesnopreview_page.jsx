import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './yesnopreview_page.scss';

const YesNoPreviewPage = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (answer) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestionIndex]: answer }));

    if (answer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      setScore((prevScore) => prevScore + 10);
    }

    setTotalScore((prevTotal) => prevTotal + 10);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {questions.length === 0 ? (
        <h2>No questions added yet.</h2>
      ) : (
        <div>
          {currentQuestionIndex < questions.length ? (
            <div className='preview_yesno2'>
              <h5>
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
                <span className='score'>Score: {score}/{totalScore}</span>
              </h5>
              <div className='preview_yesno'>
                <div className='no' onClick={() => handleAnswer('no')}><p>No</p></div>
                <div className='yes' onClick={() => handleAnswer('yes')}><p>Yes</p></div>
              </div>
            </div>
          ) : (
            <div className='good_job'>
              <p>You've answered all questions!</p>
              <p>Your score: {score}/{totalScore}</p>
              <span>Good Job!</span>
            </div>
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
