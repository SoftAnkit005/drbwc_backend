const Cart = require("../models/cart");
const Product = require("../models/product");

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const user_id = req.user.userId; // Extract user_id from middleware
    const { product_id, quantity,color } = req.body;

    // Check if the product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the item is already in the cart
    let cartItem = await Cart.findOne({ where: { user_id, product_id } });

    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity = quantity;
      cartItem.color = color;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem,
      });
    }

    // If item does not exist, create a new cart entry
    cartItem = await Cart.create({ user_id, product_id, quantity });
    res
      .status(201)
      .json({ success: true, message: "Item added to cart", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding to cart", error });
  }
};


// Get Cart Items with Product Details
const getCartWithProducts = async (req, res) => {
  try {
    const user_id = req.user.userId; // Extract user ID from middleware

    // Fetch cart items with associated product details
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "product_name",
            "product_description",
            "image_urls",
            "category_id",
            "subcategory_id",
            // "attribute_id",
            // "variant_id",
            "video_link",
            "amazon_link",
            "flipkart_link",
            "status",
            "visibility",
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart items", error });
  }
};

// Remove Product from Cart
const removeProductFromCart = async (req, res) => {
  try {
    const user_id = req.user.userId; // Extract user ID from middleware
    const { product_id } = req.params;

    // Find the cart item to remove
    const cartItem = await Cart.findOne({ where: { user_id, product_id } });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    // Remove the product from the cart
    await cartItem.destroy();
    res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing product from cart", error });
  }
};

module.exports = { addToCart, getCartWithProducts, removeProductFromCart };
