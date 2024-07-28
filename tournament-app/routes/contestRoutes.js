const express = require('express');
const auth = require('../middleware/auth');
const {
  createContest,
  getContests,
  getContestById,
  updateContest,
  deleteContest,
} = require('../controllers/contestController');
const upload = require('../middleware/upload');

const router = express.Router();

/**
 * @swagger
 * /api/contests:
 *   post:
 *     summary: Create a new contest
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               cities:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Contest created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', auth(),upload.single('images'), createContest);

/**
 * @swagger
 * /api/contests:
 *   get:
 *     summary: Get all contests
 *     tags: [Contests]
 *     responses:
 *       200:
 *         description: List of contests
 */
router.get('/', getContests);

/**
 * @swagger
 * /api/contests/{id}:
 *   get:
 *     summary: Get a contest by ID
 *     tags: [Contests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contest ID
 *     responses:
 *       200:
 *         description: Contest details
 *       404:
 *         description: Contest not found
 */
router.get('/:id', getContestById);

/**
 * @swagger
 * /api/contests/{id}:
 *   put:
 *     summary: Update a contest
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contest ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contest updated
 *       404:
 *         description: Contest not found
 */
router.put('/:id', auth(), upload.single('images'), updateContest);

/**
 * @swagger
 * /api/contests/{id}:
 *   delete:
 *     summary: Delete a contest
 *     tags: [Contests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contest ID
 *     responses:
 *       200:
 *         description: Contest deleted
 *       404:
 *         description: Contest not found
 */
router.delete('/:id', auth(), deleteContest);

module.exports = router;
