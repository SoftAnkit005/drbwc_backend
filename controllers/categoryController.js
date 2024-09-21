// controllers/categoryController.js
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const Category = require("../models/category");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, description, position, status } = req.body;

    // Create the category entry in the database
    const category = await Category.create({
      name,
      description,
      position,
      status,
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating category", error });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      success: true,
      message: "Category Fetch successfully",
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching categories", error });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, position, status } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Update other fields
    category.name = name;
    category.description = description;
    category.position = position;
    category.status = status;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating category", error });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting category", error });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
