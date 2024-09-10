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

exports.updateLeaderboardEntry = async (req, res) => {
    try {
        const { userId } = req.params;
        const { score, isWinner, contestId, subroundId } = req.body;

        // Find the leaderboard entry
        const leaderboard = await LeaderBoard.findOne({ userId });

        if (!leaderboard) {
            return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
        }

        // Update leaderboard entry
        leaderboard.score = score !== undefined ? score : leaderboard.score;
        leaderboard.isWinner = isWinner !== undefined ? isWinner : leaderboard.isWinner;
        leaderboard.contestId = contestId !== undefined ? contestId : leaderboard.contestId;
        leaderboard.subroundId = subroundId !== undefined ? subroundId : leaderboard.subroundId;

        // Save the updated leaderboard entry
        await leaderboard.save();

        // Check if the user is a winner
        if (isWinner) {
            // Update the subRounds document
            const subRound = await SubRound.findById(subroundId);

            if (!subRound) {
                return res.status(404).send({ status: "error", message: "SubRound not found" });
            }

            // Add the userId to the winners array if not already present
            if (!subRound.winners.includes(userId)) {
                subRound.winners.push(userId);
                await subRound.save();
            }
        }

        res.status(200).send({ status: "success", data: leaderboard });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};








