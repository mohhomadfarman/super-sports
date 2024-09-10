const express = require('express');
const auth = require('../middleware/auth');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();


router.post('/:userId',auth(), leaderboardController.createLeaderBoard);

router.get('/single/leaderboard/:userId', leaderboardController.getLeaderboardSingle);

router.put('/update/:userId', leaderboardController.updateLeaderboardEntry);

module.exports = router;