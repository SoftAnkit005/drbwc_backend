const Attribute = require("../models/attribute");

// Create a new attribute
const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    const attribute = await Attribute.create({ name });

    res.status(201).json({
      success: true,
      message: "Attribute created successfully",
      attribute,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating attribute", error });
  }
};

// Get all attributes
const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.findAll();
    res.status(200).json({
      success: true,
      message: "Attributes fetched successfully",
      attributes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching attributes", error });
  }
};

// Update an attribute
const updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const attribute = await Attribute.findByPk(id);

    if (!attribute) {
      return res
        .status(404)
        .json({ success: false, message: "Attribute not found" });
    }

    attribute.name = name;
    await attribute.save();

    res.status(200).json({
      success: true,
      message: "Attribute updated successfully",
      attribute,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating attribute", error });
  }
};

// Delete an attribute
const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const attribute = await Attribute.findByPk(id);

    if (!attribute) {
      return res
        .status(404)
        .json({ success: false, message: "Attribute not found" });
    }

    await attribute.destroy();

    res.status(200).json({
      success: true,
      message: "Attribute deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting attribute", error });
  }
};

module.exports = {
  createAttribute,
  getAttributes,
  updateAttribute,
  deleteAttribute,
};
