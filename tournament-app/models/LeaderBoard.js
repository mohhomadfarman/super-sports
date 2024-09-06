const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaderBoardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    score: { type:Number, required: true},
    contestId: { type: Schema.Types.ObjectId, ref: 'Contest'},
    subroundId: { type:Schema.Types.ObjectId,ref: 'subRounds'},
    isWinner: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LeaderBoard', LeaderBoardSchema)