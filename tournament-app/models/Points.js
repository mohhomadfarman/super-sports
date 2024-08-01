// models/Points.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
  round: { type: String, required: true },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Points', PointsSchema);
