// routes/contestRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const contestController = require('../controllers/contestController');

const router = express.Router();

/**
 * @swagger
 * /contests:
 *   post:
 *     summary: Create a new contest
 *     tags: [Contests]
 */
router.post('/', auth('admin'), upload.single('image'), contestController.createContest);

/**
 * @swagger
 * /contests:
 *   get:
 *     summary: get contest
 *     tags: [Contests]
 */
router.get('/', auth(), contestController.getContest);
/**
 * @swagger
 * /contests/{id}:
 *   put:
 *     summary: Update an existing contest
 *     tags: [Contests]
 */
router.put('/:id', auth('admin'), upload.single('image'), contestController.updateContest);

/**
 * @swagger
 * /contests/{id}:
 *   delete:
 *     summary: Delete a contest
 *     tags: [Contests]
 */
router.delete('/:id', auth('admin'), contestController.deleteContest);

/**
 * @swagger
 * /contests/{id}/winner:
 *   put:
 *     summary: Add a winner to a contest
 *     tags: [Contests]
 */
router.put('/:id/winner', auth('admin'), contestController.addWinner);


module.exports = router;
