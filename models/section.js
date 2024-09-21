// models/section.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config"); // Import your sequelize instance

const Section = sequelize.define(
  "Section",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Automatically adds 'createdAt' and 'updatedAt' fields
    tableName: "section",
  }
);

module.exports = Section;
