// server.js

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes.js");
const gameRoutes = require('./routes/gameRoutes.js');
const geminiRoutes = require('./routes/geminiRoutes.js'); // Import the geminiRoutes function

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Function to set up and use geminiRoutes
function setupGeminiRoutes() {
  app.use('/gemini', geminiRoutes);
}

// Invoke the function to set up Gemini routes
setupGeminiRoutes();

// Other routes
app.use('/api/email', emailRoutes);
app.use('/api/games', gameRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
