// models/wishlist.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Wishlist = sequelize.define(
  "Wishlist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },  
  {
    timestamps: false,
    tableName: "wishlist",
  }
);
module.exports = Wishlist;
