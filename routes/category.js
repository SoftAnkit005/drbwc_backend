// routes/category.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();
router.get("/get-categories", getCategories);

router.use(authMiddleware);

// Category
router.post("/create-category", createCategory);
router.post("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
