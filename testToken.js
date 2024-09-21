// testToken.js
require("dotenv").config(); // Load environment variables

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "default_secret";
const token = jwt.sign({ userId: 1 }, secret, { expiresIn: "1h" });

