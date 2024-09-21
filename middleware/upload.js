// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Set up storage and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product"); // Path where files will be uploaded
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + "-" + file.fieldname + ext; // Unique filename
    cb(null, filename);
  },
});

// Configure multer to accept multiple files
const upload = multer({
  storage: storage,
});

module.exports = upload;
