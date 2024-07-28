// routes/cityRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const {
  createCity,
  getCities,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");

const router = express.Router();

router.post("/", auth("admin"), createCity);
router.get("/", auth(), getCities);
router.put("/:id", auth("admin"), updateCity);
router.delete("/:id", auth("admin"), deleteCity);

module.exports = router;
