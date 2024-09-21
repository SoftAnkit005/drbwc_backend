// controllers/authController.js
require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      email,
      password: hashedPassword,
      full_name,
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error registering user", error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      message: "User login successfully",
      user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newPassword = crypto.randomBytes(8).toString("hex");

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested a new password for your account.\n\n
             Your new password is: ${newPassword}\n\n
             Please change this password after logging in for security purposes.\n`,
    };
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error sending reset email", error });
  }
};

// Reset Password
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     // Find user by reset token and check if token is still valid
//     const user = await User.findOne({
//       where: {
//         reset_password_token: token,
//         reset_password_expires: {
//           [Op.gt]: Date.now(), // Check if token has expired
//         },
//       },
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or expired token" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update user's password and clear the reset token and expiration
//     user.password = hashedPassword;
//     user.reset_password_token = null;
//     user.reset_password_expires = null;
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error resetting password", error });
//   }
// };
const logout = (req, res) => {
  try {
    // Since we're using JWT, we can't really invalidate the token on the server side without a token blacklist.
    // For simplicity, we will assume the client deletes the token on their side.

    // Optionally, you could use Redis or another storage to store invalidated tokens and check against them.
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error logging out", error });
  }
};
module.exports = { register, login, forgotPassword, logout };
