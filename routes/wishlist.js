// routes/wishlist.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  toggleWishlist,
  getUserWishlist,
} = require("../controllers/wishlistController");

router.use(authMiddleware);

// Wishlist Routes
router.post("/", toggleWishlist);
router.get("/get", getUserWishlist);

module.exports = router;
