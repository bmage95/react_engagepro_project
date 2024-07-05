import React from 'react';

interface TestResultProps {
    score: number;
}

const TestResult: React.FC<TestResultProps> = ({ score }) => {
    const personalityType = () => {
        if(score > 10){
            return 'Extrovert';
        } else {
            return 'Introvert';
        }
    }

    return (
        <div className="result-container">
            <h2>Your Score: {score}</h2>
            <h2>Your Personality Type: <span>{personalityType()}</span></h2>
            <p>(hint: if score above 10 then extrovert)</p>
        </div>
    );
};

export default TestResult;