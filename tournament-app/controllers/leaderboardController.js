const LeaderBoard = require('../models/LeaderBoard');
const SubRound = require('../models/subRounds');

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
        console.log(leaderboard)
        await leaderboard.save();
        res.status(201).send({status:"success.message"});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLeaderboardSingle = async (req, res) => {
    try {
        const { userId } = req.params;

        const leaderboard = await LeaderBoard.findOne({ userId });
        if (!leaderboard) {
            return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
        }

        res.status(200).send({ status: "success", data: leaderboard });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};
// exports.updateLeaderboardEntry = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { score, isWinner, contestId, subroundId } = req.body;

//         const leaderboard = await LeaderBoard.findOne({ userId });

//         if (!leaderboard) {
//             return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
//         }
//         leaderboard.score = score !== undefined ? score : leaderboard.score;
//         leaderboard.isWinner = isWinner !== undefined ? isWinner : leaderboard.isWinner;
//         leaderboard.contestId = contestId !== undefined ? contestId : leaderboard.contestId;
//         leaderboard.subroundId = subroundId !== undefined ? subroundId : leaderboard.subroundId;

//         await leaderboard.save();

//         res.status(200).send({ status: "success", data: leaderboard });
//     } catch (error) {
//         res.status(500).send({ status: "error", message: error.message });
//     }
// };

// exports.updateLeaderboardEntry = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { score, isWinner, contestId, subroundId } = req.body;

//         const leaderboard = await LeaderBoard.findOne({ userId });

//         if (!leaderboard) {
//             return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
//         }

//         leaderboard.score = score !== undefined ? score : leaderboard.score;
//         leaderboard.isWinner = isWinner !== undefined ? isWinner : leaderboard.isWinner;
//         leaderboard.contestId = contestId !== undefined ? contestId : leaderboard.contestId;
//         leaderboard.subroundId = subroundId !== undefined ? subroundId : leaderboard.subroundId;

//         await leaderboard.save();

//         if (isWinner) {
//             const subRound = await SubRound.findById(subroundId);

//             if (!subRound) {
//                 return res.status(404).send({ status: "error", message: "SubRound not found" });
//             }
//             if (!subRound.winners.includes(userId)) {
//                 subRound.winners.push(userId);
//                 await subRound.save();
//             }
//         }

//         res.status(200).send({ status: "success", data: leaderboard });
//     } catch (error) {
//         res.status(500).send({ status: "error", message: error.message });
//     }
// };


exports.updateLeaderboardEntry = async (req, res) => {
    try {
        const { userId } = req.params;
        const { score, isWinner, contestId, subroundId } = req.body;

        const leaderboard = await LeaderBoard.findOne({ userId });

        if (!leaderboard) {
            return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
        }

        // Update the leaderboard entry
        leaderboard.score = score !== undefined ? score : leaderboard.score;
        leaderboard.isWinner = isWinner !== undefined ? isWinner : leaderboard.isWinner;
        leaderboard.contestId = contestId !== undefined ? contestId : leaderboard.contestId;
        leaderboard.subroundId = subroundId !== undefined ? subroundId : leaderboard.subroundId;

        await leaderboard.save();

        const subRound = await SubRound.findById(subroundId);

        if (!subRound) {
            return res.status(404).send({ status: "error", message: "SubRound not found" });
        }

        // Add or remove the user from winners
        if (isWinner) {
            // Add user to winners if not already in the list
            if (!subRound.winners.includes(userId)) {
                subRound.winners.push(userId);
            }
        } else {
            // Remove user from winners if they exist
            subRound.winners = subRound.winners.filter(winnerId => winnerId.toString() !== userId.toString());
        }

        await subRound.save();

        res.status(200).send({ status: "success", data: leaderboard });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};








