const LeaderBoard = require('../models/LeaderBoard');

exports.createLeaderBoard = async (req, res) => {
    try {
        const { userId, score, contestId, subroundId, isWinner } = req.body;

        const leaderboard = new LeaderBoard({
            userId,
            score,
            contestId,
            subroundId,
            isWinner
        });
        await leaderboard.save();
        res.status(201).send({status:"success.message"});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getleaderboard = async (req, res) => {
    try {
        const leaderboard = await LeaderBoard.find().populate('userId','contestId','subroundId');
        res.status(200).send(leaderboard);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getleaderboardSingle = async (req, res) => {
    try {
        const leaderboard = await LeaderBoard.findById(req.param.id).populate('userId','constestId','subroundId');
        res.status(200).send(leaderboard);
        } catch (error) {
            res.status(500).send(error.message);
        }
};

exports.updateLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;
        const {  userId, score, contestId, subroundId, isWinner } = req.body;

        const leaderboard = await LeaderBoard.findById(id);
        if (!leaderboard) {
            return res.status(404).send("leader board not found");
        }

        leaderboard.userId = userId || leaderboard.userId;
        leaderboard.score = score || leaderboard.score;
        leaderboard.contestId = contestId || leaderboard.contestId;
        leaderboard.subroundId = subroundId || leaderboard.subroundId;
        leaderboard.isWinner = isWinner || leaderboard.isWinner;

        await leaderboard.save();
        res.status(200).send(leaderboard);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;
        
        const leaderboard = await LeaderBoard.findById(id);
        if (!leaderboard) {
            return res.status(404).send("leader board not found");
        }

        await LeaderBoard.deleteOne({ _id: id });
        res.status(200).send("leader board deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};