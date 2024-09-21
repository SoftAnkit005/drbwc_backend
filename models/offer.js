const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Define the Offer model
const Offer = sequelize.define(
  "Offer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    offer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_description: {
      type: DataTypes.TEXT,
    },
    offer_type: {
      type: DataTypes.ENUM("holiday", "product", "code"),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "products",
        key: "id",
      },
    },
    offer_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_type: {
      type: DataTypes.ENUM("fixed", "percentage"),
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "offers", // Specify the table name
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = Offer;
