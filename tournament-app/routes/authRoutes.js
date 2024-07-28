// routes/authRoutes.js
const express = require("express");
const { signup, login, getProfile, updateProfile } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/me', auth(), getProfile);
router.put('/me', auth(), updateProfile);

module.exports = router;
