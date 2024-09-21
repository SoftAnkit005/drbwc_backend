const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// Transaction Routes
router.post("/create", authMiddleware, createTransaction);
router.get("/get", authMiddleware, getTransactions);
router.delete("/delete/:id", authMiddleware, deleteTransaction);

module.exports = router;
