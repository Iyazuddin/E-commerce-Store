const Order = require("../models/order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_PRICE = 49;

const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Validate required shipping fields
    const required = [
      "fullName",
      "address",
      "city",
      "state",
      "postalCode",
      "country",
      "phone",
    ];
    const missing = required.filter(
      (field) => !shippingAddress || !shippingAddress[field]?.trim(),
    );
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please fill in: ${missing.join(", ")}`,
      });
    }

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // Validate stock for every item before creating the order
    for (const item of cartItems) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "One of the products in your cart is no longer available",
        });
      }
      if (item.quantity > item.product.countInStock) {
        return res.status(400).json({
          success: false,
          message: `Only ${item.product.countInStock} units of ${item.product.name} are in stock`,
        });
      }
    }

    const itemsPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const shippingPrice = itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Decrement stock for each purchased item
    await Promise.all(
      cartItems.map(async (item) => {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { countInStock: -item.quantity },
        });
      }),
    );

    // Clear the cart
    await Cart.deleteMany({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("orderItems.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product",
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Security: only the owner can view their order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
};
