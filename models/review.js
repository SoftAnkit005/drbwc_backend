// models/review.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config"); // Import your sequelize instance

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Automatically adds 'createdAt' and 'updatedAt' fields
    tableName: "reviews",
  }
);

module.exports = Review;
