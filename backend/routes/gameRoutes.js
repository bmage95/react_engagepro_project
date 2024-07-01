const express = require('express');
const router = express.Router();
const Game = require('../server.js'); // Adjust the path as needed

// Save a new game snapshot
router.post('/', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.json(newGame);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get saved games for a user
router.get('/:userId', async (req, res) => {
  try {
    const games = await Game.find({ userId: req.params.userId });
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
