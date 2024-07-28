// models/Match.js
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
  type: { type: String, enum: ["single", "round"], required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Match", matchSchema);
