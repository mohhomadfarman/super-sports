// // routes/matchRoutes.js
// const express = require("express");
// const auth = require("../middleware/auth");
// const {
//   createMatch,
//   getMatches,
//   updateMatch,
//   deleteMatch,
//   joinMatch,
//   getJoinedMatches,
// } = require("../controllers/matchController");
// const upload = require("../middleware/upload");

// const router = express.Router();

// /**
//  * @swagger
//  * /matches:
//  *   post:
//  *     summary: Create Match
//  *     tags: [Match]
//  */
// router.post("/", auth("admin"), createMatch);
// /**
//  * @swagger
//  * /matches:
//  *   get:
//  *     summary: Get Match lists
//  *     tags: [Match]
//  */
// router.get("/", auth(), getMatches);
// /**
//  * @swagger
//  * /matches/:id:
//  *   put:
//  *     summary: Update Match
//  *     tags: [Match]
//  */
// router.put("/:id", auth("admin"), updateMatch);
// /**
//  * @swagger
//  * /matches/:id:
//  *   delete:
//  *     summary: Delete Match
//  *     tags: [Match]
//  */
// router.delete("/:id", auth("admin"), deleteMatch);
// /**
//  * @swagger
//  * /matches/join/:matchId:
//  *   post:
//  *     summary: Joining Match
//  *     tags: [Match]
//  */
// router.post('/join/:matchId', auth("user"), joinMatch);
// /**
//  * @swagger
//  * /matches/joined:
//  *   get:
//  *     summary: joined Matchs
//  *     tags: [Match]
//  */
// router.get('/joined', auth(), getJoinedMatches);

// module.exports = router;


// routes/matchRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const matchController = require('../controllers/matchController');

const router = express.Router();

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 */
router.post('/', auth('admin'), matchController.createMatch);

/**
 * @swagger
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
 */

router.put('/:id', auth('admin'), matchController.updateMatch);

/**
 * @swagger
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 */
router.delete('/:id', auth('admin'), matchController.deleteMatch);

/**
 * @swagger
 * /matches/{id}/winner:
 *   put:
 *     summary: Add a winner to a match
 *     tags: [Matches]
 */
router.put('/:id/winner', auth('admin'), matchController.addWinner);
// /**
//  * @swagger
//  * /matches:
//  *   get:
//  *     summary: Get Match lists
//  *     tags: [Match]
//  */
router.get("/", auth(), matchController.getMatches);
// /**
//  * @swagger
//  * /matches/join/:matchId:
//  *   post:
//  *     summary: Joining Match
//  *     tags: [Match]
//  */
router.post('/join/:matchId', auth("user"), matchController.joinMatch);
/**
 * @swagger
 * /matches/joined:
 *   get:
 *     summary: joined Matchs
 *     tags: [Match]
 */
router.get('/joined', auth(), matchController.getJoinedMatches);

module.exports = router;

