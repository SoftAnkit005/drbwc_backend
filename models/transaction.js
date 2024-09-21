const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Transaction = sequelize.define(
  "Transaction",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.TEXT,
    },
    transaction_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Transaction;
