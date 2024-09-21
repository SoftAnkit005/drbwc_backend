// routes/section.js
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { deleteUser, getAllusers } = require("../controllers/userController");

// Import your token authentication middleware

const router = express.Router();

// API Routes
router.delete("/delete/:id", authenticateToken, deleteUser); // Delete a section (requires token)
router.get("/get", authenticateToken, getAllusers); // Get all sections (no token required)

module.exports = router;
