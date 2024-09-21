const Transaction = require("../models/transaction");
const Order = require("../models/order");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const {
      order_id,
      transaction_id,
      transaction_date,
      payment_response,
      status,
    } = req.body;

    // Create the transaction entry in the database
    const transaction = await Transaction.create({
      order_id,
      transaction_id,
      transaction_date,
      payment_response,
      status,
    });

    // If the transaction is successful, update the order status to "success"
    if (status.toLowerCase() === "success") {
      const order = await Order.findByPk(order_id);
      if (order) {
        await order.update({ status: "success" });
      }
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Transaction created successfully",
        transaction,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating transaction", error });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching transactions", error });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    await transaction.destroy();
    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting transaction", error });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
};
