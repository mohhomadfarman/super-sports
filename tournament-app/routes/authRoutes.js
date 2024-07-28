// routes/authRoutes.js
const express = require("express");
const { signup, login, getProfile, updateProfile } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register
 *     tags: [UserAuth]
 */
router.post("/signup", signup);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login
 *     tags: [UserAuth]
 */
router.post("/login", login);
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get Profile
 *     tags: [UserAuth]
 */
router.get('/me', auth(), getProfile);
/**
 * @swagger
 * /me:
 *   put:
 *     summary: Update Profile
 *     tags: [UserAuth]
 */
router.put('/me', auth(), updateProfile);

module.exports = router;
