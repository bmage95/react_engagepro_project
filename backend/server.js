const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes.js");

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
app.use(express.json()); // to accept JSON data from frontend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String
});
const User = mongoose.model('User', userSchema);

// Route to handle user login
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

// Email Routes
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
