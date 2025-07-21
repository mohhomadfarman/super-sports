// models/Tournament.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const tournamentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
//   matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
//   file: { type: String },
//   startDate: { type: Date, required: true },
//   winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the winner
//   endDate: { type: Date, required: true },
// });
const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  file: { type: String, required: true },
  rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  final_winner: { type: Schema.Types.ObjectId, ref: 'User' },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Tournament", tournamentSchema);
