import React from 'react';
import PropTypes from 'prop-types';
import './TT_maker.scss';

const TriviaPreview = () => {
    let storedQuestions = localStorage.getItem('savedQuestions');
    if (!storedQuestions) {
        storedQuestions = [];
    } else {
        try {
            storedQuestions = JSON.parse(storedQuestions);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            storedQuestions = [];
        }
    }

    return (
        <div className="trivia-preview">
            <h1>Trivia Preview</h1>
            {storedQuestions.map((question, index) => (
                <div key={index} className="question">
                    <h2>{question.title}</h2>
                    <ul>
                        {question.options.map((option, idx) => (
                            <li key={idx}>
                                <input type="radio" name={`question-${index}`} value={option.title} />
                                {option.title}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

TriviaPreview.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired
                })
            ).isRequired
        })
    )
};

export default TriviaPreview;
