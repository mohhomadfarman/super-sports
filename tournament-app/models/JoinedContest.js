// models/JoinedContest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JoinedContestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
  submission: { type: String, required: true },
  isWinner: { type: Boolean, default: false },
  isSelected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JoinedContest', JoinedContestSchema);
