const Order = require("../models/order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = await Order.create(orderData);
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating order", error });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching orders", error });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating order", error });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.destroy();
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting order", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
