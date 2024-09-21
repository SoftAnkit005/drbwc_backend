// controllers/bannerController.js
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const Banner = require("../models/banner");


// Create a new banner
const createBanner = async (req, res) => {
  try {
     const { title, description, status } = req.body;
    const image = req.file; // File uploaded by Multer
    console.log('image=>>>>>',image)
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Construct the image URL
    const newImageUrl = `http://localhost:5000/uploads/banners/${image.filename}`;

    // Insert the new section data into the database
    const banner = await Banner.create({
      title,
      description,
      image_url: newImageUrl,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Banner",
      error: error.message,
    });
  }
};

// Get all banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).json({
      success: true,
      message: "Banner Fetch successfully",
      banners,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating banner", error });
  }
};

// Update a banner
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const image = req.file; // Get the uploaded file (if any) from Multer

    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    let newImageUrl = banner.image_url; // Default to the current image URL

    if (image) {
      // If a new image is uploaded, construct the new image URL
      newImageUrl = `http://localhost:5000/uploads/banners/${image.filename}`;

      // Optionally, delete the old image file from the server
      const oldImagePath = path.join(
        __dirname,
        "../uploads/banners",
        path.basename(banner.image_url)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Remove the old image file
      }
    }

    // Update the banner data
    banner.title = title || banner.title;
    banner.status = status || banner.status;
    banner.description = description || banner.description;
    banner.image_url = newImageUrl;

    // Save the updated banner
    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating banner", error });
  }
};

// Delete a banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await banner.destroy();
    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting banner", error });
  }
};

module.exports = { createBanner, getBanners, updateBanner, deleteBanner };
