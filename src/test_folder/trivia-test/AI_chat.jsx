import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const OpenAiChat = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
  
    const surpriseOptions = [
      "What is today?",
    ]
  
    const surprise = () => {
      const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
      setValue(randomValue);
    }
  
    const getResponse = async () => {
        if (!value) {
            setError("Error: Please ask a question");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: [{
                        parts: value
                    }],
                    message: value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch('http://localhost:3001/gemini', options);
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error processing request: ${errorMessage}`);
            }
    
            const data = await response.text();
            console.log(data);
    
            setChatHistory(oldChatHistory => [
                ...oldChatHistory,
                {
                    role: "user",
                    parts: value
                },
                {
                    role: "model",
                    parts: data
                }
            ]);
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Error: Something went wrong");
        }
    };
    
    
  
    const clear = () => {
      setValue("");
      setError("");
      setChatHistory([]);
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the form from being submitted
        getResponse();
      }
    }
    return (
      <div className="app">
          <p>What do you want to know?
          <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
          </p>
          <div className="input-container">
            <input 
              value={value}
              placeholder="Type your question here"
              onChange={(e) => setValue(e.target.value)} 
              onKeyDown={handleKeyDown} />
  
            {!error && <button onClick={getResponse}>Ask Me</button>}
            {error && <button onClick={clear}>Clear</button>}
          </div>
          {error && <p>{error}</p>}
          <div className="search-result">
            {chatHistory.map((chatItem, _index) => <div key={_index}>
              <p className="answer">
                <span style={{ color: '#00ffa2', fontWeight: 600 }}>
                  {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)} :
                  </span>
                                {/* Render markdown content here */}
                <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                  </p>
            </div>)}
            
          </div>
  
      </div>
    );
};

export default OpenAiChat;
