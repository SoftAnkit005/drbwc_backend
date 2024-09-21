// controllers/wishlistController.js
const Wishlist = require("../models/wishlist");
const Product = require("../models/product");

// Add or Remove a product from the wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    // Check if the wishlist item already exists
    const existingItem = await Wishlist.findOne({
      where: { product_id, user_id },
    });

    if (existingItem) {
      // If exists, remove it
      await existingItem.destroy();
      res
        .status(200)
        .json({ success: true, message: "Product removed from wishlist" });
    } else {
      // If not exists, add it
      await Wishlist.create({ product_id, user_id });
      res
        .status(201)
        .json({ success: true, message: "Product added to wishlist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error toggling wishlist", error });
  }
};

// Get all wishlist items for a user
const getUserWishlist = async (req, res) => {
  try {
   
    const user_id = req.user.userId; // Extract user_id from middleware
    
    // Fetch wishlist items with associated product details
    const wishlistItems = await Wishlist.findAll({
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
          required: true, // Ensure that product details are included
        },
      ],
    });
      
    res.status(200).json({
      success: true,
      wishlistItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching wishlist", error });
  }
};

module.exports = { toggleWishlist, getUserWishlist };
