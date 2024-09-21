// routes/tag.js
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
} = require("../controllers/tagController");

// Import your token authentication middleware

const router = express.Router();

// API Routes
router.post("/create", authenticateToken, createTag); // Create a tag (requires token)
router.post("/update/:id", authenticateToken, updateTag); // Update a tag (requires token)
router.delete("/delete/:id", authenticateToken, deleteTag); // Delete a tag (requires token)
router.get("/get", getAllTags); // Get all tags (no token required)

module.exports = router;
