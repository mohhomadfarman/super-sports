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

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Create City
 *     tags: [City]
 */
router.post("/", auth("admin"), createCity);
/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get all City
 *     tags: [City]
 */
router.get("/", auth(), getCities);
/**
 * @swagger
 * /cities/:id:
 *   put:
 *     summary: Update City
 *     tags: [City]
 */
router.put("/:id", auth("admin"), updateCity);
/**
 * @swagger
 * /cities/:id:
 *   Delete:
 *     summary: Delete City
 *     tags: [City]
 */
router.delete("/:id", auth("admin"), deleteCity);

module.exports = router;
