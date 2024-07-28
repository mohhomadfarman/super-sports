// controllers/contestController.js
const Contest = require('../models/Contest');

// Create Contest
exports.createContest = async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).send(contest);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Contests
exports.getContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate('cities categories');
    res.send(contests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get Contest by ID
exports.getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate('cities categories');
    if (!contest) return res.status(404).send("Contest not found");
    res.send(contest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update Contest
exports.updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contest) return res.status(404).send("Contest not found");
    res.send(contest);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete Contest
exports.deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).send("Contest not found");
    res.send(contest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
