// models/Tournament.js
const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
});

module.exports = mongoose.model("Tournament", tournamentSchema);
