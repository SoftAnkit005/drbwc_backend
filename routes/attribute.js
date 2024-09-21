// routes/attribute.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createAttribute,
  getAttributes,
  updateAttribute,
  deleteAttribute,
} = require("../controllers/attributeController");

const router = express.Router();

router.use(authMiddleware);

// Attribute Routes
router.post("/create", createAttribute);
router.get("/get", getAttributes);
router.post("/update/:id", updateAttribute);
router.delete("/delete/:id", deleteAttribute);

module.exports = router;
