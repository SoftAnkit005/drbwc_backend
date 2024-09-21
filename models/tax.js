const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Define the Tax model
const Tax = sequelize.define(
  "Tax",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tax_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "taxes",
    timestamps: false,
  }
);

module.exports = Tax;
