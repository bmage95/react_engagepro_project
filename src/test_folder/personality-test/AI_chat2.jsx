import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AI_chat2.scss'

const OpenAiChat2 = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
  
    const surpriseOptions = [
      "athletes",
      "animals",
      "magicians",
      "superheroes",
      "introverts",
      "extroverts",
      "leaders",
      "writers",
      "doctors",
      "engineers",
      "mathematicians",
      "old people",
      "teens",
    ]
  
    const surprise = () => {
      const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
      const finalValue = "Tell me a personality fact about " + randomValue;
      setValue(finalValue);
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
      <div className="personalityChatBot">
          <img src='https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'/>
          <h1>Personality Bot</h1><br/>
          <div className="input-container"> 
            <input 
              value={value}
              placeholder="  try asking for personality related questions!"
              onChange={(e) => setValue(e.target.value)} 
              onKeyDown={handleKeyDown} />
  
            {!error && <button onClick={getResponse}>Ask Away</button>}
            {error && <button onClick={clear}>Clear Input</button>}
            <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
          </div>
          {error && <p>{error}</p>}
          <div className="search-result">
            {chatHistory.map((chatItem, _index) => <div key={_index}>
              <p className="answer">
                <span style={{fontSize: "24px", fontWeight: 800}}>
                  {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)} :
                  </span>
  
                <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                  </p>
            </div>)}
          </div>
  
      </div>
    );
};

export default OpenAiChat2;
