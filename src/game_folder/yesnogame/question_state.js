import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './question_state.scss';

const QState = ({ addQuestion }) => {
  const [questions, setQuestions] = useState([
    { question: '', answer: 'yes' }
  ]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('unsavedQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('unsavedQuestions', JSON.stringify(questions));
  }, [questions]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 15) {
      setQuestions([...questions, { question: '', answer: 'yes' }]);
    }
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (index) => {
    const q = questions[index];
    if (q.question.trim() !== '') {
      addQuestion(q);
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  return (
    <div className='ques_state'>
      {questions.map((q, index) => (
        <fieldset key={index}>
          <label htmlFor={`quest_${index}`}>Enter Question: </label><br />
          <input 
            type="text" 
            id={`quest_${index}`} 
            value={q.question} 
            onChange={(e) => handleQuestionChange(index, e.target.value)} 
          />
          
          <div>
            <input 
              type="radio" 
              id={`yes_${index}`} 
              name={`quest_${index}`} 
              checked={q.answer === 'yes'} 
              onChange={() => handleAnswerChange(index, 'yes')}
            />
            <label htmlFor={`yes_${index}`}>Yes</label>
          </div>

          <div>
            <input 
              type="radio" 
              id={`no_${index}`} 
              name={`quest_${index}`} 
              checked={q.answer === 'no'} 
              onChange={() => handleAnswerChange(index, 'no')}
            />
            <label htmlFor={`no_${index}`}>No</label>
          </div>

          <button onClick={() => handleRemoveQuestion(index)}>Remove</button>
          <button onClick={() => handleSubmit(index)}>Set Question</button>
        </fieldset>
      ))}
      
      {questions.length < 5 && (
        <button onClick={handleAddQuestion}>Add Question</button>
      )}
    </div>
  );
};

QState.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default QState;
