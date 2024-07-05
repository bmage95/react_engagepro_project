import React, { useState, useEffect } from "react";
import mongoose from "mongoose";
import './TT_maker.scss';

const TriviaBuilder = ({ profile, setQuestions }) => {
    const [localQuestions, setLocalQuestions] = useState([{ title: "", options: [{ title: "" }, { title: "" }] }]);
    const userId = new mongoose.Types.ObjectId(parseInt(profile.id));

    useEffect(() => {
        const storedQuestions = localStorage.getItem('savedQuestions');
        if (storedQuestions) {
            try {
                setLocalQuestions(JSON.parse(storedQuestions));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, []);

    const addClick = () => {
        setLocalQuestions([...localQuestions, { title: "", options: [] }]);
    };

    const removeClick = (i) => {
        let newQuestions = [...localQuestions];
        newQuestions.splice(i, 1);
        setLocalQuestions(newQuestions);
    };

    const removeOption = (qi, i) => {
        let newQuestions = [...localQuestions];
        let options = [...newQuestions[qi].options];
        options.splice(i, 1);
        newQuestions[qi] = { ...newQuestions[qi], options };
        setLocalQuestions(newQuestions);
    };

    const handleChange = (i, e) => {
        const { name, value } = e.target;
        let newQuestions = [...localQuestions];
        newQuestions[i] = { ...newQuestions[i], [name]: value };
        setLocalQuestions(newQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(newQuestions));
    };

    const handleOptions = (qi, i, e) => {
        const { name, value } = e.target;
        let newQuestions = [...localQuestions];
        let options = [...newQuestions[qi].options];
        options[i] = { ...options[i], [name]: value };
        newQuestions[qi] = { ...newQuestions[qi], options };
        setLocalQuestions(newQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(newQuestions));
    };

    const addOption = (i) => {
        let newQuestions = [...localQuestions];
        newQuestions[i] = {
            ...newQuestions[i],
            options: [...localQuestions[i].options, { title: "" }]
        };
        setLocalQuestions(newQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(newQuestions));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userId) {
            console.error('User ID is undefined');
            return;
        }
    
        // Validate the structure of localQuestions
        const isValid = localQuestions.every(question => {
            if (!question.title || typeof question.title !== 'string') return false;
            if (!Array.isArray(question.options) || question.options.length === 0) return false;
            return question.options.every(option => option.title && typeof option.title === 'string');
        });
    
        if (!isValid) {
            console.error('Invalid questions structure', localQuestions);
            return;
        }
    
        console.log({ userId, localQuestions });
    
        try {
            const response = await fetch('http://localhost:3001/api/trivia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, questions: localQuestions })
            });
    
            if (!response.ok) {
                const errorDetail = await response.json();
                console.error('Server Error:', errorDetail);
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            setQuestions(localQuestions); // Update the questions in TTBuilder
            alert('Trivia saved successfully: ' + JSON.stringify(result));
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    const createQuestions = () => {
        return localQuestions.map((el, i) => (
            <div key={i}>
                <input
                    placeholder="Title"
                    name="title"
                    value={el.title || ""}
                    onChange={(e) => handleChange(i, e)}
                />
                <div className="pl-4">{createOptions(i)}</div>
                <input
                    type="button"
                    value="add options"
                    onClick={() => addOption(i)}
                />
                <input
                    type="button"
                    value="remove"
                    onClick={() => removeClick(i)}
                />
            </div>
        ));
    };

    const createOptions = (qi) => {
        return localQuestions[qi].options.map((el, i) => (
            <div key={i}>
                <input
                    placeholder="Option"
                    name="title"
                    value={el.title || ""}
                    onChange={(e) => handleOptions(qi, i, e)}
                />
                <input
                    type="button"
                    value="remove"
                    onClick={() => removeOption(qi, i)}
                />
            </div>
        ));
    };

    return (
        <form className="TTmaker" onSubmit={handleSubmit}>
            {createQuestions()}
            <br/>
            <input
                type="button"
                value="add more"
                onClick={addClick}
            />
            <br/>
            <input type="submit" value="Submit"/>
        </form>
    );
};

export default TriviaBuilder;
