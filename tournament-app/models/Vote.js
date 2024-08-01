// models/Vote.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
  submissionId: { type: Schema.Types.ObjectId, ref: 'JoinedContest', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', VoteSchema);
