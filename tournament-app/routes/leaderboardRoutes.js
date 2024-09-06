const express = require('express');
const auth = require('../middleware/auth');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();


router.post('/:userId/leaderboard',auth(), leaderboardController.createLeaderBoard);

module.exports = router;