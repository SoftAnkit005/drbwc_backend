const Tax = require("../models/tax");

// Create a new tax
const createTax = async (req, res) => {
  try {
    const { tax_name, tax_rate, description, status } = req.body;

    const tax = await Tax.create({
      tax_name,
      tax_rate,
      description,
      status,
    });

    res.status(201).json({ success: true, message: "Tax created", tax });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating tax", error });
  }
};

// Get all taxes
const getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.findAll();
    res.status(200).json({ success: true, taxes });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching taxes", error });
  }
};

// Update a tax
const updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const { tax_name, tax_rate, description, status } = req.body;

    const tax = await Tax.findByPk(id);

    if (!tax) {
      return res.status(404).json({ success: false, message: "Tax not found" });
    }

    await tax.update({ tax_name, tax_rate, description, status });
    res.status(200).json({ success: true, message: "Tax updated", tax });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating tax", error });
  }
};

// Delete a tax
const deleteTax = async (req, res) => {
  try {
    const { id } = req.params;

    const tax = await Tax.findByPk(id);

    if (!tax) {
      return res.status(404).json({ success: false, message: "Tax not found" });
    }

    await tax.destroy();
    res.status(200).json({ success: true, message: "Tax deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting tax", error });
  }
};

module.exports = {
  createTax,
  getAllTaxes,
  updateTax,
  deleteTax,
};
