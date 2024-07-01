const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes.js");
// Import statements remain the same

// Ensure correct import of router for game routes
const gameRoutes = require('./routes/gameRoutes.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema and Game Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
});
const User = mongoose.model('User', userSchema);

const gameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
  date: { type: Date, default: Date.now },
});
const Game = mongoose.model('Game', gameSchema);

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { name, email, picture } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    console.error('Error handling login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Use game routes
app.use('/api/games', gameRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
