// controllers/matchController.js
const Match = require("../models/Match");
const Tournament = require("../models/Tournament");

exports.createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    await Tournament.findByIdAndUpdate(req.body.tournament, {
      $push: { matches: match._id },
    });
    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error);
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
    const matchId = req.params.matchId;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).send("Match not found");

    // Check if the user is already a participant
    if (match.participants.includes(userId)) {
      return res.status(400).send("User already joined this match");
    }

    // Add user to participants
    match.participants.push(userId);
    await match.save();

    res.send(`User joined match ${matchId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) return res.status(404).send("Match not found");
    res.send(match);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).send("Match not found");
    res.send(match);
  } catch (error) {
    res.status(500).send(error);
  }
};
