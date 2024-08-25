// // controllers/contestController.js
// const Contest = require('../models/Contest');
// const JoinedContest = require('../models/JoinedContest');
// const path = require('path');
// const fs = require('fs');

// // Create Contest
// exports.createContest = async (req, res) => {
//   try {
//     const { name, description, cities, categories, startDate, endDate } = req.body;
//     const imagePath = req.file ? req.file.path : null;

//     const contest = new Contest({
//       name,
//       description,
//       image: imagePath,
//       cities,
//       categories,
//       startDate,
//       endDate
//     });

//     await contest.save();
//     res.status(201).send(contest);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// // Create Contest
// exports.getContest = async (req, res) => {
//   try {
// const contest = await Contest.find().populate('cities categories');
//     // await contest.save();
//     res.status(201).send(contest);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// // Update Contest
// exports.updateContest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, cities, categories, startDate, endDate } = req.body;

//     const contest = await Contest.findById(id);
//     if (!contest) {
//       return res.status(404).send("Contest not found");
//     }

//     contest.name = name || contest.name;
//     contest.description = description || contest.description;
//     contest.cities = cities || contest.cities;
//     contest.categories = categories || contest.categories;
//     contest.startDate = startDate || contest.startDate;
//     contest.endDate = endDate || contest.endDate;

//     if (req.file) {
//       // Remove the old image
//       if (contest.image) {
//         fs.unlinkSync(contest.image);
//       }
//       contest.image = req.file.path;
//     }

//     await contest.save();
//     res.status(200).send(contest);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// // Delete Contest
// exports.deleteContest = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const contest = await Contest.findById(id);
//     if (!contest) {
//       return res.status(404).send("Contest not found");
//     }

//     // Remove the image
//     if (contest.image) {
//       fs.unlinkSync(contest.image);
//     }

//     await Contest.deleteOne({ _id: id });
//     res.status(200).send("Contest deleted successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// // Add Winner
// exports.addWinner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { winnerId } = req.body;

//     const contest = await Contest.findById(id);
//     if (!contest) {
//       return res.status(404).send("Contest not found");
//     }

//     contest.winnerId = winnerId;
//     await contest.save();

//     res.status(200).send(contest);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };



// controllers/contestController.js
const Contest = require('../models/Contest');
// const JoinedContest = require('../models/JoinedContest');
// const path = require('path');
const fs = require('fs');

// Create Contest
exports.createContest = async (req, res) => {
  try {
    const { name, description, cities, categories, startDate, endDate } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const contest = new Contest({
      name,
      description,
      image: imagePath,
      cities: cities, // Assuming cities are sent as a comma-separated string
      category: categories, // Assuming categories are sent as a comma-separated string
      startDate,
      endDate
    });

    await contest.save();
    res.status(201).send(contest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get Contests
exports.getContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate('cities category');
    res.status(200).send(contests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Get Contests
exports.getContestsSignle = async (req, res) => {
  try {
    const contests = await Contest.findById(req.params.id).populate('cities category rounds participants');
    res.status(200).send(contests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update Contest
exports.updateContest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, cities, categories, startDate, endDate } = req.body;

    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).send("Contest not found");
    }

    contest.name = name || contest.name;
    contest.description = description || contest.description;
    contest.cities = cities ? cities.split(',') : contest.cities;
    contest.category = categories ? categories.split(',') : contest.category;
    contest.startDate = startDate || contest.startDate;
    contest.endDate = endDate || contest.endDate;

    if (req.file) {
      // Remove the old image
      if (contest.image) {
        fs.unlinkSync(contest.image);
      }
      contest.image = req.file.path;
    }

    await contest.save();
    res.status(200).send(contest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete Contest
exports.deleteContest = async (req, res) => {
  try {
    const { id } = req.params;

    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).send("Contest not found");
    }

    // Remove the image
    if (contest.image) {
      fs.unlinkSync(contest.image);
    }

    await Contest.deleteOne({ _id: id });
    res.status(200).send("Contest deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add Winner
exports.addWinner = async (req, res) => {
  try {
    const { id } = req.params;
    const { winnerId } = req.body;

    const contest = await Contest.findById(id);
    if (!contest) {
      return res.status(404).send("Contest not found");
    }

    contest.final_winner = winnerId;
    await contest.save();

    res.status(200).send(contest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
