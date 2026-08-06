const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate({
      path: "product",
      select: "name brand price image countInStock rating numReviews",
    });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const existing = await Wishlist.findOne({
      user: req.user._id,
      product,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Product already in wishlist",
        wishlistItem: existing,
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user._id,
      product,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    // Security: only allow users to remove their own wishlist items
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to remove this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
