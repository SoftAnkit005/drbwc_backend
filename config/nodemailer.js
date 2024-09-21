const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service like 'SendGrid', 'Mailgun', etc.
  auth: {
    user: "rajan.softieons@gmail.com",
    pass: "ejrcvrxohutyhjqn", // Consider using environment variables for security
  },
});

module.exports = transporter;
