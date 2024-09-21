// controllers/reviewController.js
const Review = require("../models/review");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { name, review } = req.body;

    const reviews = await Review.create({
      name,
      review,
    });

    res.status(201).json({
      success: true,
      message: "Reviews created successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review } = req.body;

    // Find the existing Review by ID
      const reviews = await Review.findByPk(id);
      

    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Update the Review with new data
    await reviews.update({
      name,
      review,
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.findByPk(id);
    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await reviews.destroy();
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// Get all review (no token required)
const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getAllReview,
};
