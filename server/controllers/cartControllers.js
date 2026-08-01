const Cart = require("../models/Cart");

// =======================
// Add Product To Cart
// =======================
const addToCart = async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product,
    });

    if (existingItem) {
      existingItem.quantity += quantity;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem: existingItem,
      });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Logged In User Cart
// =======================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate({
      path: "product",
      select: "name brand price image",
    });

    res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Remove Item From Cart
// =======================
const removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
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
  addToCart,
  getCart,
  removeFromCart,
};