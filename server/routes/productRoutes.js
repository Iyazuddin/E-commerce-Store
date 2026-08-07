const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getProductCategories,
  createProductReview,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.get("/categories", getProductCategories);

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/:id/reviews", protect, createProductReview);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
