const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // Price snapshot so order history stays correct even if the
        // product price changes later (industry-standard practice).
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },

    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
