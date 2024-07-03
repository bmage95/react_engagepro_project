const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes.js");
const gameRoutes = require('./routes/gameRoutes.js');

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

// Define `profile` here
const profile = {
  id: "666820b8bbbc49c5a339dc2c"
};

const ObjectId = mongoose.Types.ObjectId;
const userId = new ObjectId(profile && profile.id);

mongoose.connect(`mongodb://localhost:27017/${userId}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/games', gameRoutes); // Register gameRoutes

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});