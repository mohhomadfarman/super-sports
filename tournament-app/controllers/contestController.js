// controllers/contestController.js
const Contest = require('../models/Contest');
const fs = require('fs');
const path = require('path'); 
// Create Contest
exports.createContest = async (req, res) => {
  try {
    const { name, description, cities, categories } = req.body;
    // Handle image file upload if available
    const image = req.file ? req.file.path : undefined;

    // Create a new contest
    const newContest = new Contest({
      name,
      description,
      images: image,
      cities,
      categories,
      startDate,
      endDate
    });

    // Save the contest to the database
    await newContest.save();

    // Send the response back to the client
    res.status(201).json(newContest);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(400).json({ message: "Error creating contest", error: error.message });
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
    // Find the contest by ID
    const contest = await Contest.findById(req.params.id);

    if (!contest) return res.status(404).send("Contest not found");

    // Handle image deletion if a new image is being uploaded
    if (req.file) {
      // Delete the old image if it exists
      if (contest.images) {
        const oldImagePath = path.resolve(contest.images);

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image file:", err);
          }
        });
      }

      // Update the contest with the new image
      req.body.images = req.file.path;
    }

    // Update the contest with the new data
    const updatedContest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedContest) return res.status(404).send("Contest not found");

    // Send the updated contest
    res.send(updatedContest);
  } catch (error) {
    console.error("Error updating contest:", error.message);
    res.status(500).json({ message: "Error updating contest", error: error.message });
  }
};

// Delete Contest
exports.deleteContest = async (req, res) => {
  try {
    // Find the contest by ID
    const contest = await Contest.findById(req.params.id);

    if (!contest) return res.status(404).send("Contest not found");

    // Delete the image file if it exists
    if (contest.images) {
      fs.unlink(path.resolve(contest.images), (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    // Delete the contest from the database
    await Contest.findByIdAndDelete(req.params.id);

    // Send success response
    res.send({ message: "Contest deleted successfully" });
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({ message: "Error deleting contest", error: error.message });
  }
};
