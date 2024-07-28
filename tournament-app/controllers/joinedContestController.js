// controllers/joinedContestController.js
const JoinedContest = require('../models/JoinedContest');

// Join Contest with Video Submission
exports.joinContest = async (req, res) => {
  try {
    const userId = req.user._id;
    const contestId = req.params.contestId;
    const videoPath = req.file.path;

    const existingEntry = await JoinedContest.findOne({ user: userId, contest: contestId });
    if (existingEntry) return res.status(400).send("Already joined this contest");

    const joinedContest = new JoinedContest({
      user: userId,
      contest: contestId,
      submission: videoPath,
    });

    await joinedContest.save();
    res.status(201).send(joinedContest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete Submission
exports.deleteSubmission = async (req, res) => {
  try {
    const userId = req.user._id;
    const contestId = req.params.contestId;

    const joinedContest = await JoinedContest.findOneAndDelete({ user: userId, contest: contestId });
    if (!joinedContest) return res.status(404).send("Submission not found");

    res.send("Submission deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
