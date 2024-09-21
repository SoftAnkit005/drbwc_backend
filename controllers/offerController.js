const Offer = require("../models/offer");

// Create a new offer
const createOffer = async (req, res) => {
  try {
    const {
      offer_name,
      offer_description,
      offer_type,
      product_id,
      offer_code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      status,
    } = req.body;

    // Validate discount type and value
    if (
      (discount_type === "percentage" &&
        (discount_value <= 0 || discount_value > 100)) ||
      (discount_type === "fixed" && discount_value < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid discount value for the selected discount type.",
      });
    }

    // Create the offer in the database
    const offer = await Offer.create({
      offer_name,
      offer_description,
      offer_type,
      product_id,
      offer_code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating offer", error });
  }
};

// Get all offers
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.status(200).json({ success: true, offers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching offers", error });
  }
};

// Update an offer
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      offer_name,
      offer_description,
      offer_type,
      product_id,
      offer_code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      status,
    } = req.body;

    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    // Validate discount type and value
    if (
      (discount_type === "percentage" &&
        (discount_value <= 0 || discount_value > 100)) ||
      (discount_type === "fixed" && discount_value < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid discount value for the selected discount type.",
      });
    }

    await offer.update({
      offer_name,
      offer_description,
      offer_type,
      product_id,
      offer_code,
      discount_type,
      discount_value,
      start_date,
      end_date,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating offer", error });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    await offer.destroy();
    res
      .status(200)
      .json({ success: true, message: "Offer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting offer", error });
  }
};

module.exports = {
  createOffer,
  getOffers,
  updateOffer,
  deleteOffer,
};
