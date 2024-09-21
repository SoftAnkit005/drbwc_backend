const sequelize = require("../config/config");
const User = require("./User");
const Product = require("./product");
const Category = require("./category");
const SubCategory = require("./subcategory");
const Wishlist = require("./wishlist");
const Cart = require("./cart");
const Offer = require("./offer");
const Tax = require("./tax"); 
const Attribute = require("./attribute");
const Variant = require("./variant");
const Section = require("./section");

sequelize
  .sync()
  .then()
  .catch();

// Define associations
Product.hasMany(Wishlist, { foreignKey: "product_id" });
Wishlist.belongsTo(Product, { foreignKey: "product_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });
Offer.belongsTo(Product, { foreignKey: "product_id" });

// Product.belongsTo(Attribute, { foreignKey: "attribute_id" });
// Attribute.hasMany(Variant, { foreignKey: "attribute_id" });

// Product.belongsTo(Variant, { foreignKey: "variant_id" });
// Variant.hasMany(Product, { foreignKey: "variant_id" });

// Attribute.hasMany(Variant, { foreignKey: "attribute_id" });
// Variant.belongsTo(Attribute, { foreignKey: "attribute_id" });

module.exports = {
  User,
  Product,
  Wishlist,
  Offer,
  Tax,
  Attribute,
  Variant,
  Category,
  SubCategory,
  Section,
};
