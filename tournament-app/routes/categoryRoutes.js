// routes/categoryRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create Category
 *     tags: [Category]
 */
router.post("/", auth("admin"), createCategory);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get All Category
 *     tags: [Category]
 */
router.get("/", auth(), getCategories);
/**
 * @swagger
 * /category/:id:
 *   put:
 *     summary: Update Category
 *     tags: [Category]
 */
router.put("/:id", auth("admin"), updateCategory);
/**
 * @swagger
 * /category/:id:
 *   delete:
 *     summary: Update Category
 *     tags: [Category]
 */
router.delete("/:id", auth("admin"), deleteCategory);

module.exports = router;
