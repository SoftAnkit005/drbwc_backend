// routes/section.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");
const {
  createSection,
  updateSection,
  deleteSection,
  getAllSections,
} = require("../controllers/sectionController");

 // Import your token authentication middleware

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/sections";
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize Multer middleware
const upload = multer({ storage });



// API Routes
router.post("/create", authenticateToken, upload.single("image"), createSection); // Create a section with image upload (requires token)
router.post("/update/:id", authenticateToken, upload.single("image"), updateSection);  // Update a section (requires token)
router.delete("/delete/:id", authenticateToken, deleteSection); // Delete a section (requires token)
router.get("/get", getAllSections); // Get all sections (no token required)

module.exports = router;
