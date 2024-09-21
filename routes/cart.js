const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addToCart,
  getCartWithProducts,
  removeProductFromCart,
} = require("../controllers/cartController");

const router = express.Router();

// Apply authMiddleware to all cart routes
router.use(authMiddleware);

// Add to Cart route
router.post("/create", addToCart);

// Get Cart Items with Product Details
router.get("/get", getCartWithProducts);

// Remove Product from Cart
router.delete("/remove/:product_id", removeProductFromCart);

module.exports = router;
