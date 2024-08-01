// models/Tournament.js
const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
  file: { type: String },
  startDate: { type: Date, required: true },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the winner
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Tournament", tournamentSchema);
