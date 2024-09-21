// routes/auth.js
const express = require("express");
const {
  register,
  login,
  forgotPassword,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post('/login', login);

router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);

// Create a new banner
router.post('/create-banner', authMiddleware, createBanner);

// Get all banners
router.get('/', authMiddleware, getBanners);

// Update a banner by ID
router.put('/:id', authMiddleware, updateBanner);

// Delete a banner by ID
router.delete('/:id', authMiddleware, deleteBanner);

module.exports = router;
