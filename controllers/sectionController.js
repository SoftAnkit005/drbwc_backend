// controllers/sectionController.js
const Section = require("../models/section");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Create a new section handler
const createSection = async (req, res) => {
  try {
    const { type, product_id, description } = req.body;
    const image = req.file; // File uploaded by Multer

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Construct the image URL
    const newImageUrl = `http://localhost:5000/uploads/sections/${image.filename}`;

    // Insert the new section data into the database
    const section = await Section.create({
      type,
      product_id,
      image: newImageUrl,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating section",
      error: error.message,
    });
  }
};



const updateSection = async (req, res) => {
  try {
    const { id } = req.params; // Get the section ID from the request parameters
    const { type, product_id, description } = req.body; // Get the updated data from the request body
    const image = req.file; // Get the uploaded file (if any) from Multer

    // Find the section by ID
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    let newImageUrl = section.image; // Default to the current image URL

    if (image) {
      // If a new image is uploaded, construct the new image URL
      newImageUrl = `http://localhost:5000/uploads/sections/${image.filename}`;

      // Optionally, delete the old image file from the server
      const oldImagePath = path.join(
        __dirname,
        "../uploads/sections",
        path.basename(section.image)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Remove the old image file
      }
    }

    // Update the section data
    section.type = type || section.type;
    section.product_id = product_id || section.product_id;
    section.description = description || section.description;
    section.image = newImageUrl;

    // Save the updated section
    await section.save();

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating section",
      error: error.message,
    });
  }
};

// Delete a section
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await section.destroy();
    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting section",
      error: error.message,
    });
  }
};

// Get all sections (no token required)
const getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll();

    res.status(200).json({
      success: true,
      message: "Sections fetched successfully",
      sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sections",
      error: error.message,
    });
  }
};

module.exports = {
  createSection,
  updateSection,
  deleteSection,
  getAllSections,
};
