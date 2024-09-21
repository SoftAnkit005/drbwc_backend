// routes/review.js
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  createReview,
  updateReview,
  deleteReview,
  getAllReview,
} = require("../controllers/reviewController");

// Import your token authentication middleware

const router = express.Router();

// API Routes
router.post("/create", authenticateToken, createReview); // Create a review (requires token)
router.post("/update/:id", authenticateToken, updateReview); // Update a review (requires token)
router.delete("/delete/:id", authenticateToken, deleteReview); // Delete a review (requires token)
router.get("/get", getAllReview); // Get all reviews (no token required)

module.exports = router;
