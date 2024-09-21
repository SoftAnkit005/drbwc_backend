const Variant = require("../models/variant");

// Create a new variant
const createVariant = async (req, res) => {
  try {
    const { attribute_id, value } = req.body;

    const variant = await Variant.create({ attribute_id, value });

    res.status(201).json({
      success: true,
      message: "Variant created successfully",
      variant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating variant", error });
  }
};

// Get all variants
const getVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll();
    res.status(200).json({
      success: true,
      message: "Variants fetched successfully",
      variants,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching variants", error });
  }
};

// Update a variant
const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { attribute_id, value } = req.body;

    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    variant.attribute_id = attribute_id;
    variant.value = value;
    await variant.save();

    res.status(200).json({
      success: true,
      message: "Variant updated successfully",
      variant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating variant", error });
  }
};

// Delete a variant
const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    await variant.destroy();

    res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting variant", error });
  }
};

module.exports = {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant,
};
