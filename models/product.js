const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.TEXT, // Can also use DataTypes.JSON or DataTypes.STRING depending on how you store it
      allowNull: true,
    },
    color_image_urls: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    qty: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    use_for: {
      type: DataTypes.STRING, // VARCHAR equivalent in Sequelize
      allowNull: true,
    },
    power_source: {
      type: DataTypes.STRING, // VARCHAR equivalent in Sequelize
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING, // VARCHAR equivalent in Sequelize
      allowNull: true,
    },
    item_weight: {
      type: DataTypes.STRING, // VARCHAR equivalent in Sequelize
      allowNull: true,
    },
    about_item: {
      type: DataTypes.TEXT, // Allows for longer text entries
      allowNull: true,
    },
    video_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amazon_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    flipkart_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    visibility: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "public",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "products",
  }
);
module.exports = Product;
