// routes/joinedContestRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const joinedContestController = require('../controllers/joinedContestController');

const router = express.Router();

/**
 * @swagger
 * /joinedContests/join/:contestId:
 *   post:
 *     summary: joining Contests
 *     tags: [Joining Contests]
 */

router.post('/join/:contestId', auth(), upload.single('video'), joinedContestController.joinContest);
/**
 * @swagger
 * /joinedContests/delete/:contestId:
 *   delete:
 *     summary: Delete Contests Submission
 *     tags: [Joining Contests]
 */
router.delete('/delete/:contestId', auth(), joinedContestController.deleteSubmission);

module.exports = router;
