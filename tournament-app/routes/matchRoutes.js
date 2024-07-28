// routes/matchRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const {
  createMatch,
  getMatches,
  updateMatch,
  deleteMatch,
  joinMatch,
  getJoinedMatches,
} = require("../controllers/matchController");

const router = express.Router();

router.post("/", auth("admin"), createMatch);
router.get("/", auth(), getMatches);
router.put("/:id", auth("admin"), updateMatch);
router.delete("/:id", auth("admin"), deleteMatch);
router.post('/join/:matchId', auth("user"), joinMatch);
router.get('/joined', auth(), getJoinedMatches);

module.exports = router;
