// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/config");
const authRoutes = require("./routes/auth");
const bannerRoutes = require("./routes/banner");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");
const attributeRoutes = require("./routes/attribute");
const variantRoutes = require("./routes/variant");
const productRoutes = require("./routes/product");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");
const offerRoutes = require("./routes/offer");
const taxRoutes = require("./routes/tax");
const orderRoutes = require("./routes/order");
const transactionRoutes = require("./routes/transaction");
const sectionRoutes = require("./routes/section");
const tagRoutes = require("./routes/tag");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads/product", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/banners", bannerRoutes); // Add this line for banner routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/attribute", attributeRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/offer", offerRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then().catch();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
