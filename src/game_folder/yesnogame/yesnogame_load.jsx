import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext'; // Adjust the path as needed
import axios from 'axios';

const YesNoGameLoad = ({ questions }) => {
  const { user } = useContext(UserContext);
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`/api/games/${user._id}`)
        .then(response => setSavedGames(response.data))
        .catch(error => console.error('Error fetching saved games:', error));
    }
  }, [user]);

  const saveSnapshot = () => {
    if (questions.length === 0) {
      alert("Please add questions first.");
      return;
    }

    const newSnapshot = {
      userId: user._id,
      questions,
      date: new Date(),
    };

    axios.post('/api/games', newSnapshot)
      .then(response => {
        setSavedGames([...savedGames, response.data]);
        alert('Game saved successfully');
      })
      .catch(error => console.error('Error saving game:', error));
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
