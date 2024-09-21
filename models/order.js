const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Order = sequelize.define(
  "Order",
  {
    order_prefix: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tax_id: {
      type: DataTypes.INTEGER,
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    order_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tax: {
      type: DataTypes.STRING,
    },
    total_amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_id: {
      type: DataTypes.INTEGER,
    },
    discount_type: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Order;
