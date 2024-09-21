const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { Product } = require("../models");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const { Op } = require("sequelize");


const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      price,
      qty,
      category_id,
      subcategory_id,
      size,
      use_for,
      power_source,
      material,
      item_weight,
      about_item,
      video_link,
      amazon_link,
      flipkart_link,
      status,
      visibility,
    } = req.body;


    const reqFiles = req.files;

    
    // Categorize files
    const imageFiles = reqFiles.filter(
      (file) => file.fieldname === "image_urls"
    );
    const colorImageFiles = reqFiles.filter((file) =>
      file.fieldname.startsWith("color_image_urls")
    );

    // Save general product images
    const savedImagePaths = imageFiles.map(
      (file) => `http://localhost:5000/uploads/product/${file.filename}`
    );

    // Save color variant images
    const variantImagePaths = {};
    colorImageFiles.forEach((file) => {
      // Extract color from the fieldname
      const colorMatch = file.fieldname.match(/color_image_urls\[(.*?)\]/);
      if (colorMatch) {
        const color = colorMatch[1];
        if (!variantImagePaths[color]) {
          variantImagePaths[color] = [];
        }
        variantImagePaths[color].push(
          `http://localhost:5000/uploads/product/${file.filename}`
        );
      }
    });

    // Output the URLs for debugging
    console.log("General Image Paths:", savedImagePaths);
    console.log("Variant Image Paths:", variantImagePaths);



    // Save product to the database
    const product = await Product.create({
      product_name,
      product_description,
      price,
      image_urls: JSON.stringify(savedImagePaths),
      color_image_urls: JSON.stringify(variantImagePaths),
      qty,
      category_id,
      subcategory_id,
      size,
      use_for,
      power_source,
      material,
      item_weight,
      about_item,
      video_link,
      amazon_link,
      flipkart_link,
      status,
      visibility,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully with images and variant images",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};
// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products", error });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you get the product ID from the request params

    const {
      product_name,
      product_description,
      price,
      qty,
      category_id,
      subcategory_id,
      size,
      use_for,
      power_source,
      material,
      item_weight,
      about_item,
      video_link,
      amazon_link,
      flipkart_link,
      status,
      visibility,
    } = req.body;

    const reqFiles = req.files;

    // Set the directory to save images
    const uploadDir = path.join(__dirname, "../uploads/product");

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Categorize files
    const imageFiles = reqFiles.filter(
      (file) => file.fieldname === "image_urls"
    );
    const colorImageFiles = reqFiles.filter((file) =>
      file.fieldname.startsWith("color_image_urls")
    );

    // Save general product images
    const savedImagePaths = imageFiles.map((file) => {
      const filePath = path.join(uploadDir, file.filename);
      fs.renameSync(file.path, filePath); // Move the file to the new directory
      return `http://localhost:5000/uploads/product/${file.filename}`;
    });

    // Save color variant images
    const variantImagePaths = {};
    colorImageFiles.forEach((file) => {
      const colorMatch = file.fieldname.match(/color_image_urls\[(.*?)\]/);
      if (colorMatch) {
        const color = colorMatch[1];
        if (!variantImagePaths[color]) {
          variantImagePaths[color] = [];
        }
        const filePath = path.join(uploadDir, file.filename);
        fs.renameSync(file.path, filePath); // Move the file to the new directory
        variantImagePaths[color].push(
          `http://localhost:5000/uploads/product/${file.filename}`
        );
      }
    });

    // Output the URLs for debugging
    console.log("General Image Paths:", savedImagePaths);
    console.log("Variant Image Paths:", variantImagePaths);

    // Find the existing product by ID
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update product in the database
    await existingProduct.update({
      product_name,
      product_description,
      price,
      image_urls: JSON.stringify(savedImagePaths),
      color_image_urls: JSON.stringify(variantImagePaths),
      qty,
      category_id,
      subcategory_id,
      size,
      use_for,
      power_source,
      material,
      item_weight,
      about_item,
      video_link,
      amazon_link,
      flipkart_link,
      status,
      visibility,
    });

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully with new images and variant images",
      product: existingProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};


// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting product", error });
  }
};

const getProductsByCategoryId = async (req, res) => {
  try {
    const { category_id } = req.params;

    // Fetch products by category ID, including their variants and attributes
    const products = await Product.findAll({
      where: { category_id },
      attributes: [
        "id",
        "product_name",
        "product_description",
        "image_urls",
        "category_id",
        "subcategory_id",
        "qty",
        "price",
        "video_link",
        "amazon_link",
        "flipkart_link",
        "status",
        "visibility",
      ],
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products", error });
  }
};

const getProductsBySubCategoryId = async (req, res) => {
  try {
    const { subcategory_id } = req.params;

    // Fetch products by category ID, including their variants and attributes
    const products = await Product.findAll({
      where: { subcategory_id },
      attributes: [
        "id",
        "product_name",
        "product_description",
        "image_urls",
        "category_id",
        "subcategory_id",
        "qty",
        "price",
        "video_link",
        "amazon_link",
        "flipkart_link",
        "status",
        "visibility",
      ],
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products", error });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the product by ID
    const product = await Product.findOne({
      where: { id },
      attributes: [
        "id",
        "product_name",
        "product_description",
        "image_urls",
        "category_id",
        "subcategory_id",
        "qty",
        "price",
        "video_link",
        "amazon_link",
        "flipkart_link",
        "status",
        "visibility",
      ],
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Fetch the related category, subcategory, and variant data manually
    const [category, subcategory] = await Promise.all([
      Category.findOne({
        where: { id: product.category_id },
        attributes: ["id", "name"],
      }),
      Subcategory.findOne({
        where: { id: product.subcategory_id },
        attributes: ["id", "name"],
      }),
    ]);

    // Construct the response object with related data
    const productWithDetails = {
      ...product.toJSON(),
      category,
      subcategory,
    };

    res.status(200).json({ success: true, product: productWithDetails });
  } catch (error) {
    // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

const globalSearch = async (req, res) => {
  try {
    const { query } = req.query; // Get the search term from the query string

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query.",
      });
    }

    // Perform the search in all three models
    const [categories, subcategories, products] = await Promise.all([
      // Search in Categories
      Category.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`, // Case-insensitive search
          },
        },
        attributes: ["id", "name"],
      }),
      // Search in Subcategories
      Subcategory.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
        attributes: ["id", "name", "category_id"],
      }),
      // Search in Products
      Product.findAll({
        where: {
          product_name: {
            [Op.like]: `%${query}%`,
          },
        },
        attributes: [
          "id",
          "product_name",
          "product_description",
          "price",
          "image_urls",
          "category_id",
          "subcategory_id",
        ],
      }),
    ]);

    // Add 'type' field to each result
    const categoriesWithType = categories.map((category) => ({
      ...category.toJSON(),
      type: "category",
    }));

    const subcategoriesWithType = subcategories.map((subcategory) => ({
      ...subcategory.toJSON(),
      type: "subcategory",
    }));

    const productsWithType = products.map((product) => ({
      ...product.toJSON(),
      type: "product",
    }));

    // Combine results into a single response
    const results = [
      ...categoriesWithType,
      ...subcategoriesWithType,
      ...productsWithType,
    ];

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching search results",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  getProductsById,
  globalSearch,
};
