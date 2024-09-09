const express = require('express');
const auth = require('../middleware/auth');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();


router.post('/:userId',auth(), leaderboardController.createLeaderBoard);


router.get('/leaderboard',auth(),leaderboardController.getleaderboard);

// router.get('/single/:userId', leaderboardController.getleaderboardSingle);
router.get('/single/:userId', leaderboardController.getLeaderboardSingle);

router.put('/:usedId',auth(),leaderboardController.updateLeaderboard);

router.delete('/:userId',auth(),leaderboardController.deleteLeaderboard);

module.exports = router;