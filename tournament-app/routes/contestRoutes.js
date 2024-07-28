// routes/contestRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const { createContest, getContests, getContestById, updateContest, deleteContest } = require('../controllers/contestController');

const router = express.Router();

router.post('/', auth(), createContest);
router.get('/', getContests);
router.get('/:id', getContestById);
router.put('/:id', auth(), updateContest);
router.delete('/:id', auth(), deleteContest);

module.exports = router;
