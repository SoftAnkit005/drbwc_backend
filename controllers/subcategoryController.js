// controllers/subcategoryController.js
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const SubCategory = require("../models/subcategory");

// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const { category_id, name, description, position, status } = req.body;

    // Create the subcategory entry in the database
    const subcategory = await SubCategory.create({
      category_id,
      name,
      description,
      position,
      status,
    });

    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      subcategory, // Fixed response key
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating subcategory", error });
  }
};

// Get all subcategories
const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.findAll();
    res.status(200).json({
      success: true,
      message: "SubCategory Fetch successfully",
      subcategories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching subcategories", error });
  }
};

// Update a subcategory
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, description, position, status } = req.body;
    const subcategory = await SubCategory.findByPk(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    // Update subcategory fields
    subcategory.category_id = category_id;
    subcategory.name = name;
    subcategory.description = description;
    subcategory.position = position;
    subcategory.status = status;
    await subcategory.save();

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      subcategory, // Fixed response key
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating subcategory", error });
  }
};

// Delete a subcategory
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findByPk(id);

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    await subcategory.destroy();
    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting subcategory", error });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
