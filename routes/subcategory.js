// routes/subcategory.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subcategoryController");

const router = express.Router();
router.get("/get-subcategories", getSubCategories);

router.use(authMiddleware);

// Sub-Category
router.post("/create-subcategory", createSubCategory);
router.post("/update-subcategory/:id", updateSubCategory);
router.delete("/delete-subcategory/:id", deleteSubCategory);

module.exports = router;
