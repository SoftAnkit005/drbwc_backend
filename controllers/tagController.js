// controllers/tagController.js
const Tag = require("../models/tag");

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { tags, product_id } = req.body;
    
    const tag = await Tag.create({
      tags,
      product_id,
    });

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating tag",
      error: error.message,
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags, product_id } = req.body;

    // Find the existing Tag by ID
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    // Update the Tag with new data
    await tag.update({
      tags,
      product_id,
    });

    res.status(200).json({
      success: true,
      message: "Tag updated successfully",
      tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating tag",
      error: error.message,
    });
  }
};

// Delete a tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    await tag.destroy();
    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting tag",
      error: error.message,
    });
  }
};

// Get all tags (no token required)
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();

    res.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tag",
      error: error.message,
    });
  }
};

module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
};
