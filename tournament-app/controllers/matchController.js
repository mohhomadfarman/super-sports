// controllers/matchController.js
const Match = require("../models/Match");
const Tournament = require("../models/Tournament");

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const { name, tournament, type, startDate, endDate } = req.body;

    const match = new Match({
      name,
      tournament,
      type,
      startDate,
      endDate,
    });

    await match.save();
    res.status(201).send(match);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate('tournament');
    res.send(matches);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getJoinedMatches = async (req, res) => {
  try {
    const userId = req.user._id;
    const matches = await Match.find({ participants: userId }).populate('tournament');
    res.send(matches);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.joinMatch = async (req, res) => {
  try {
    const userId = req.user._id;
    const matchId = req.params.id;

    // Check if the match exists
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).send("Match not found");
    }

    // Check if the user is already a participant
    const isAlreadyJoined = match.participants.includes(userId);
    if (isAlreadyJoined) {
      return res.status(400).send("User already joined this match");
    }

    // Add the user to the participants list
    match.participants.push(userId);
    await match.save();

    res.status(201).send(match);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Update an existing match
exports.updateMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    const updates = req.body;

    const match = await Match.findByIdAndUpdate(matchId, updates, { new: true });

    if (!match) {
      return res.status(404).send("Match not found");
    }

    res.send(match);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findByIdAndDelete(matchId);

    if (!match) {
      return res.status(404).send("Match not found");
    }

    res.send("Match deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Add a winner to a match
exports.addWinner = async (req, res) => {
  try {
    const matchId = req.params.id;
    const { winnerId } = req.body;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).send("Match not found");
    }

    match.winnerId = winnerId;
    await match.save();

    res.send(match);
  } catch (error) {
    res.status(500).send(error.message);
  }
};