const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/products
// Supports: keyword, category, brand, minPrice, maxPrice, inStock, sort, page, pageSize
const getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const pageSize = Math.min(
      Math.max(parseInt(req.query.pageSize, 10) || 8, 1),
      100,
    );

    const query = {};

    // Keyword search (name, brand, category)
    const keyword = req.query.keyword?.trim();
    if (keyword) {
      // Escape regex special characters so user input is safe
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { brand: { $regex: escaped, $options: "i" } },
        { category: { $regex: escaped, $options: "i" } },
      ];
    }

    // Category / brand filters
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.brand) {
      query.brand = req.query.brand;
    }

    // Price range
    if (req.query.minPrice) {
      query.price = { ...query.price, $gte: Number(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      query.price = { ...query.price, $lte: Number(req.query.maxPrice) };
    }

    // Only in-stock items
    if (req.query.inStock === "true") {
      query.countInStock = { $gt: 0 };
    }

    // Sorting
    const sortMap = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1, numReviews: -1 },
      name_asc: { name: 1 },
    };
    const sort = sortMap[req.query.sort] || sortMap.newest;

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      page,
      pageSize,
      pages: Math.max(Math.ceil(totalCount / pageSize), 1),
      totalCount,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/products/:id/reviews  (protected)
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please add a review comment",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // One review per user per product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment.trim(),
    });

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.numReviews;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductCategories,
  createProductReview,
  updateProduct,
  deleteProduct,
};
