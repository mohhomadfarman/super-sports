// models/Contest.js
const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String,required: true },
  images: { type: String,required: true },
  cities: { type: mongoose.Schema.Types.ObjectId, ref: "City",required: true },
  categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category",required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Contest", contestSchema);
