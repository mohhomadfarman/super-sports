// models/JoinedContest.js
const mongoose = require("mongoose");

const joinedContestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: "Contest", required: true },
  submission: { type: String }, // URL to the uploaded video
});

module.exports = mongoose.model("JoinedContest", joinedContestSchema);
