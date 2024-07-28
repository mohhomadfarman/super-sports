// models/Contest.js
const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Contest", contestSchema);
