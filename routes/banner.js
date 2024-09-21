// routes/auth.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/banners";
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize Multer middleware
const upload = multer({ storage });
router.get("/get-banner", getBanners);

router.use(authMiddleware);

// Banner Routes
router.post("/create-banner", upload.single("image"), createBanner);
router.post("/update-banner/:id", upload.single("image"), updateBanner);
router.delete("/delete-banner/:id", deleteBanner);



module.exports = router;
