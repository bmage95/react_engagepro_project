const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trivia = require('../models/Trivia');

router.post('/', async (req, res) => {
  try {
    const { userId, questions } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Questions are required' });
    }

    for (const question of questions) {
      if (!question.title || !Array.isArray(question.options)) {
        return res.status(400).json({ message: 'Each question must have a title and options' });
      }
    }

    const newTrivia = new Trivia(req.body);
    await newTrivia.save();
    res.json(newTrivia);
  } catch (error) {
    console.error('Error saving trivia:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userId = mongoose.Types.ObjectId(req.params.userId);
    const trivia = await Trivia.find({ userId });
    res.json(trivia);
  } catch (error) {
    console.error('Error fetching trivia:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
