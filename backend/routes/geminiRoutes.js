const express = require('express');
const { GoogleGenerativeAI, GoogleGenerativeAIError } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyCqtmDK8g20UEhoV3vk4RcEJQxFHqn5P80"); // Replace with your actual API key

// POST /gemini endpoint
router.post('/', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Ensure the history passed has 'parts' property with an array of Parts
        const chat = model.startChat({
            history: [{
                role: "user",
                parts: [{ text: req.body.message }] // Ensure req.body.message is set correctly
            }]
        });

        // Send the message to the AI model
        const result = await chat.sendMessage(req.body.message);
        const response = await result.response;
        const text = response.text();

        res.send(text);
    } catch (error) {
        if (error instanceof GoogleGenerativeAIError) {
            console.error('Google Generative AI Error:', error.message);
            res.status(400).send('Error processing request');
        } else {
            console.error('Error:', error);
            res.status(500).send('Error fetching data from Google Generative AI');
        }
    }
});

module.exports = router;
