// routes/product.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  getProductsById,
  globalSearch,
} = require("../controllers/productController");

const router = express.Router();

router.get("/category/:category_id", getProductsByCategoryId);
router.get("/subcategory/:subcategory_id", getProductsBySubCategoryId);
router.get("/get/:id", getProductsById);
router.get("/search", globalSearch);
router.get("/get", getProducts);

router.use(authMiddleware);

// Product Routes
router.post("/create", upload.any(), createProduct);
router.post("/update/:id", upload.any(), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
