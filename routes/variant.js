// routes/variant.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant,
} = require("../controllers/variantController");

router.use(authMiddleware);

// Variant Routes
router.post("/create", createVariant);
router.get("/get", getVariants);
router.post("/update/:id", updateVariant);
router.delete("/delete/:id", deleteVariant);

module.exports = router;
