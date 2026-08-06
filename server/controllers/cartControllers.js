const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;
    const qty = Math.max(parseInt(quantity, 10) || 1, 1);

    const productDoc = await Product.findById(product);
    if (!productDoc) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product,
    });

    const newQuantity = existingItem ? existingItem.quantity + qty : qty;

    // Stock validation
    if (productDoc.countInStock === 0) {
      return res.status(400).json({
        success: false,
        message: "Sorry, this product is out of stock",
      });
    }
    if (newQuantity > productDoc.countInStock) {
      return res.status(400).json({
        success: false,
        message: `Only ${productDoc.countInStock} units in stock`,
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
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
      quantity: qty,
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

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate({
      path: "product",
      select: "name brand price image countInStock",
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

// PUT /api/cart/:id  -> set a specific quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const qty = Math.max(parseInt(quantity, 10) || 1, 1);

    const item = await Cart.findById(req.params.id).populate("product");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Security: only allow users to update their own cart items
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item",
      });
    }

    if (!item.product) {
      return res.status(400).json({
        success: false,
        message: "Product is no longer available",
      });
    }

    // Stock validation
    if (item.product.countInStock === 0) {
      return res.status(400).json({
        success: false,
        message: "Sorry, this product is out of stock",
      });
    }
    if (qty > item.product.countInStock) {
      return res.status(400).json({
        success: false,
        message: `Only ${item.product.countInStock} units in stock`,
      });
    }

    item.quantity = qty;
    await item.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem: item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Security: Only allow users to remove their own cart items
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to remove this item",
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
  updateCartQuantity,
  removeFromCart,
};
