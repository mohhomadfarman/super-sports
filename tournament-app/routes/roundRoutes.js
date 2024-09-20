// routes/roundRoutes.js
const express = require('express');
const roundController = require('../controllers/roundController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/',auth('admin'), roundController.createRound);
router.get('/:id', roundController.getRounds);
router.put('/:id',auth('admin'), roundController.updateRound);
router.delete('/:id',auth('admin'), roundController.deleteRound);
router.post('/add-participants',auth('admin'), roundController.addParticipantsToSubRound);


router.get('/subrounds/:id', roundController.getSubRoundById);  

module.exports = router;
