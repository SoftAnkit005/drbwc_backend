const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createOffer,
  getOffers,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");

const router = express.Router();
router.get("/get", getOffers);

// Apply authMiddleware to all offer routes
router.use(authMiddleware);

// Create an offer
router.post("/create", createOffer);

// Get all offers

// Update an offer
router.post("/update/:id", updateOffer);

// Delete an offer
router.delete("/delete/:id", deleteOffer);

module.exports = router;
