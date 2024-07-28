// routes/tournamentRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const {
  createTournament,
  getTournaments,
  updateTournament,
  deleteTournament,
} = require("../controllers/tournamentController");

const router = express.Router();

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Create tournaments
 *     tags: [Tournaments]
 */
router.post("/", auth("admin"), createTournament);
/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Get tournaments
 *     tags: [Tournaments]
 */
router.get("/", auth(), getTournaments);
/**
 * @swagger
 * /tournaments/:id:
 *   put:
 *     summary: Upadte tournaments
 *     tags: [Tournaments]
 */
router.put("/:id", auth("admin"), updateTournament);
/**
 * @swagger
 * /tournaments/:id:
 *   delete:
 *     summary: Delete tournaments
 *     tags: [Tournaments]
 */
router.delete("/:id", auth("admin"), deleteTournament);

module.exports = router;
