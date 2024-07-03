import React, { useContext, useState, useEffect } from 'react';
import mongoose from 'mongoose';
import axios from 'axios';
import { UserContext } from '../../UserContext'; // Adjust the path as needed

const YesNoGameLoad = ({ questions }) => {
  const { profile } = useContext(UserContext);
  const [savedGames, setSavedGames] = useState([]);

  const userId = new mongoose.Types.ObjectId(parseInt(profile.id));

  useEffect(() => {
    if (profile && profile.id) {
      axios.get(`http://localhost:3001/api/games/${userId}`)
        .then(response => setSavedGames(response.data))
        .catch(error => console.error('Error fetching saved games:', error));
    } else {
      console.error('User ID is undefined');
    }
  }, [profile]);

  const saveSnapshot = () => {
    if (!profile || !profile.id) {
      alert('User ID is undefined. Cannot save game.');
      return;
    }
  
    if (questions.length === 0) {
      alert("Please add questions first.");
      return;
    }

    const newSnapshot = {
      userId,
      questions,
      date: new Date(),
    };
  
    console.log('Saving snapshot:', newSnapshot);
  
    axios.post('http://localhost:3001/api/games', newSnapshot)
      .then(response => {
        setSavedGames([...savedGames, response.data]);
        alert('Game saved successfully');
      })
      .catch(error => {
        console.error('Error saving game:', error);
        alert(`Error saving game: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Load/Save Game</h2>
      <button onClick={saveSnapshot}>Save Game</button>
      <div>
        <h3>Saved Games:</h3>
        {savedGames.length === 0 ? (
          <p>No saved games.</p>
        ) : (
          <ul>
            {savedGames.map((game, index) => (
              <li key={index}>
                Saved on: {new Date(game.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YesNoGameLoad;
