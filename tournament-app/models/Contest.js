// models/Contest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true },
  rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  final_winner: { type: Schema.Types.ObjectId, ref: 'User' },
  cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contest', ContestSchema);
