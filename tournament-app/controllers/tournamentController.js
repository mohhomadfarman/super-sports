// controllers/tournamentController.js
const Tournament = require("../models/Tournament");

exports.createTournament = async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("city matches");
    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tournament) return res.status(404).send("Tournament not found");
    res.send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).send("Tournament not found");
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error);
  }
};
