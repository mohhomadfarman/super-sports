// controllers/tournamentController.js
const Tournament = require("../models/Tournament");
const fs = require('fs');
const path = require('path');
exports.createTournament = async (req, res) => {
  try {
    const { name, city, matches,startDate,endDate } = req.body;

    // Check if the required fields are present
    if (!name || !city) {
      return res.status(400).json({ message: "Name and city are required" });
    }

    // Handle file upload
    const image = req.file ? req.file.path : undefined;

    // Create a new tournament
    const newTournament = new Tournament({
      name,
      city,
      matches,
      file: image, // Ensure this matches your model's field name
      startDate,
      endDate
    });

    // Save the tournament
    await newTournament.save();
    res.status(201).json(newTournament);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
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
    // Retrieve the tournament ID from the request parameters
    const tournamentId = req.params.id;

    // Find the existing tournament
    const existingTournament = await Tournament.findById(tournamentId);
    if (!existingTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Prepare the updated data
    const updatedData = { ...req.body };

    // If a new file is uploaded, update the file path
    if (req.file) {
      updatedData.file = req.file.path;
    }

    // Update the tournament in the database
    const updatedTournament = await Tournament.findByIdAndUpdate(tournamentId, updatedData, { new: true });

    // Send the updated tournament as a response
    res.status(200).json(updatedTournament);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.deleteTournament = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    // Find the tournament to check if it exists and get its image path
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Delete the tournament from the database
    await Tournament.findByIdAndDelete(tournamentId);

    // Delete the associated image file if it exists
    if (tournament.file) {
      const filePath = path.join(__dirname, '..', 'uploads', path.basename(tournament.file));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file from the server
      }
    }

    // Send success response
    res.status(200).json({ message: "Tournament and associated image deleted successfully" });
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
