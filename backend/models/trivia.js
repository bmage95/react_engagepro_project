const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const triviaSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      title: String,
      options: [{ title: String }],
    },
  ],
  date: { type: Date, default: Date.now },
});

const Trivia = mongoose.model('Trivia', triviaSchema);

module.exports = Trivia;
