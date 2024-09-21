const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Order Routes
router.post("/create", authMiddleware, createOrder);
router.get("/get", authMiddleware, getOrders);
router.post("/update/:id", authMiddleware, updateOrder);
router.delete("/delete/:id", authMiddleware, deleteOrder);

module.exports = router;
