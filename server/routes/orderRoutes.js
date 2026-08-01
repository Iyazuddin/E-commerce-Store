const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/orderControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

module.exports = router;