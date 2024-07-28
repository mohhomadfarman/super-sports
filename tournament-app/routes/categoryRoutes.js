// routes/contestRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const contestController = require('../controllers/contestController');

const router = express.Router();

router.post('/', auth(), contestController.createContest);
router.get('/', contestController.getContests);
router.get('/:id', contestController.getContestById);
router.put('/:id', auth(), contestController.updateContest);
router.delete('/:id', auth(), contestController.deleteContest);

module.exports = router;
