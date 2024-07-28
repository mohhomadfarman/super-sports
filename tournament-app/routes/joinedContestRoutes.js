// routes/joinedContestRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const joinedContestController = require('../controllers/joinedContestController');

const router = express.Router();

router.post('/join/:contestId', auth(), upload.single('video'), joinedContestController.joinContest);
router.delete('/delete/:contestId', auth(), joinedContestController.deleteSubmission);

module.exports = router;
