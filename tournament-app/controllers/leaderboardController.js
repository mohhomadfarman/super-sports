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
        console.log(leaderboard)
        await leaderboard.save();
        res.status(201).send({status:"success.message"});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLeaderboardSingle = async (req, res) => {
    try {
        // Get the userId from the request parameters
        const { userId } = req.params;

        // Find the leaderboard entry by userId
        const leaderboard = await LeaderBoard.findOne({ userId });

        // Check if the entry was found
        if (!leaderboard) {
            return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
        }

        // Send the leaderboard entry as the response
        res.status(200).send({ status: "success", data: leaderboard });
    } catch (error) {
        // Handle any errors that occurred
        res.status(500).send({ status: "error", message: error.message });
    }
};

// exports.updateLeaderboardEntry = async (req, res) => {
//     try {
//         // Get the userId from the request parameters
//         const { userId } = req.params;

//         const { score, isWinner, contestId, subroundId } = req.body;
  
//       const leaderboard = await LeaderBoard.findOne({userId: userId});  // Ensure you're using the correct userId to find
//       if (!leaderboard) {
//         return res.status(404).json({ message: "Leaderboard not found" });
//       }
//   console.log(leaderboard)
//       leaderboard.score = score || leaderboard.score;
//       leaderboard.isWinner = isWinner || leaderboard.isWinner;
//       leaderboard.contestId = contestId || leaderboard.contestId;
//       leaderboard.subroundId = subroundId || leaderboard.subroundId;
  
//       const response = await leaderboard.save();
//       console.log(response)
//       return res.status(200).json(leaderboard);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
// };

exports.updateLeaderboardEntry = async (req, res) => {
    try {
        // Get the userId from the request parameters
        const { userId } = req.params;

        // Get the updated data from the request body
        const { score, isWinner, contestId, subroundId } = req.body;

        // Find the leaderboard entry by userId
        const leaderboard = await LeaderBoard.findOne({ userId });

        // Check if the entry was found
        if (!leaderboard) {
            return res.status(404).send({ status: "error", message: "Leaderboard entry not found" });
        }

        // Update the leaderboard entry with the provided data
        leaderboard.score = score !== undefined ? score : leaderboard.score;
        leaderboard.isWinner = isWinner !== undefined ? isWinner : leaderboard.isWinner;
        leaderboard.contestId = contestId !== undefined ? contestId : leaderboard.contestId;
        leaderboard.subroundId = subroundId !== undefined ? subroundId : leaderboard.subroundId;

        // Save the updated leaderboard entry
        await leaderboard.save();

        // Send the updated leaderboard entry as the response
        res.status(200).send({ status: "success", data: leaderboard });
    } catch (error) {
        // Handle any errors that occurred
        res.status(500).send({ status: "error", message: error.message });
    }
};








