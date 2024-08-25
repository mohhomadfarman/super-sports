// models/Round.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubroundSchema = new Schema({
  name: { type: String, required: true },
  numberOfWinners: { type: Number, required: true },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isStatus: { type: String, default: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  roundId: { type: mongoose.Schema.Types.ObjectId, ref: 'Round', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubRound', SubroundSchema);
