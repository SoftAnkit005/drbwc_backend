const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTax,
  getAllTaxes,
  updateTax,
  deleteTax,
} = require("../controllers/taxController");

const router = express.Router();

// Tax routes
router.post("/create", authMiddleware, createTax);
router.get("/get", getAllTaxes);
router.post("/update/:id", authMiddleware, updateTax);
router.delete("/delete/:id", authMiddleware, deleteTax);

module.exports = router;
