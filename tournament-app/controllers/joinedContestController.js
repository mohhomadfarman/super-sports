// controllers/joinedContestController.js
const JoinedContest = require('../models/JoinedContest');
const path = require('path');
const fs = require('fs');
const Contest = require('../models/Contest');

// exports.joinContest = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const contestId = req.params.contestId;
//     const isSelected = req.body.isSelected ?req.body.isSelected : false ;
//     const isWinner = req.body.isWinner ? req.body.isWinner : false;

//     if (!req.file) return res.status(400).send("No video uploaded");
//     const videoPath = req.file.path;

//     const existingEntry = await JoinedContest.findOne({ user: userId, contest: contestId });
//     if (existingEntry) return res.status(400).send("Already joined this contest");

  

//     const joinedContest = new JoinedContest({
//       user: userId,
//       contest: contestId,
//       submission: videoPath,
//       isWinner: isWinner,
//       isSelected: isSelected,
//     });

//     await joinedContest.save();

//     // const isAlreadyJoined = Contest?.participants.includes(userId);
//     const isAlreadyJoined = Contest.findById(contestId);
//     if (isAlreadyJoined?.participants?.includes(userId)) {
//       return res.status(400).send("User already joined this Contest");
//     }

//     Contest?.participants.push(userId);
//     await Contest.save();

    
//     res.status(201).send(joinedContest);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


exports.joinContest = async (req, res) => {
  const userId = req.user._id;
  const contestId = req.params.contestId;
  const isSelected = req.body.isSelected || false;
  const isWinner = req.body.isWinner || false;

  if (!req.file) {
    return res.status(400).send("No video uploaded");
  }

  const videoPath = req.file.path;

  try {
    // Check if user has already joined the contest
    const existingEntry = await JoinedContest.findOne({ user: userId, contest: contestId });
    if (existingEntry) {
      return res.status(400).send("Already joined this contest");
    }

    // Create a new joined contest entry
    const joinedContest = new JoinedContest({
      user: userId,
      contest: contestId,
      submission: videoPath,
      isWinner,
      isSelected,
    });
    await joinedContest.save();

    // Update the contest with the new participant
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).send("Contest not found");
    }
    if (contest.participants.includes(userId)) {
      return res.status(400).send("User already joined this Contest");
    }

    contest.participants.push(userId);
    await contest.save();

    res.status(201).send(joinedContest);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("An error occurred while joining the contest");
  }
};


// Delete Submission
exports.deleteSubmission = async (req, res) => {
  try {
    const userId = req.user._id;
    const contestId = req.params.contestId;

    // Find the submission entry

       // Check if the user is already a participant
       const isAlreadyJoined = Contest.participants.includes(userId);
       if (isAlreadyJoined) {
         return res.status(400).send("User already joined this Contest");
       }
    
       // Add the user to the participants list
       Contest.participants.push(userId);
       await Contest.save();
   

    const entry = await JoinedContest.findOne({ user: userId, contest: contestId });
    if (!entry) return res.status(404).send("Submission not found"); 

    // Delete the file from the uploads folder
    const filePath = entry.submission;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete the file:", err);
        return res.status(500).send("Failed to delete the file");
      }
    });

    // Delete the entry from the database
    await JoinedContest.deleteOne({ _id: entry._id });

    res.status(200).send("Submission deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const contests = await JoinedContest.find().populate('user contest');
    res.send(contests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getUserSubmission = async (req, res) => {
  try {
    const contests = await JoinedContest.find( {user: req.params.id}).populate('user contest');
    res.send(contests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
