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

router.post("/", auth("admin"), createTournament);
router.get("/", auth(), getTournaments);
router.put("/:id", auth("admin"), updateTournament);
router.delete("/:id", auth("admin"), deleteTournament);

module.exports = router;
