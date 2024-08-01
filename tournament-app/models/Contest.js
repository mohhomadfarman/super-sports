// models/Contest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  rounds: [{ type: Schema.Types.ObjectId, ref: 'Points' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  winnerId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the winner
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contest', ContestSchema);
