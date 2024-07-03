const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

router.post('/', async (req, res) => {
  try {
    if (!req.body.userId || !mongoose.Types.ObjectId.isValid(req.body.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const newGame = new Game(req.body);
    await newGame.save();
    res.json(newGame);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userId = mongoose.Types.ObjectId(req.params.userId); // Ensure it's an ObjectId
    const games = await Game.find({ userId });
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
