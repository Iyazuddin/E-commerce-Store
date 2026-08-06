import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Stars from "../components/Stars";
import Skeleton from "../components/Skeleton";
import fallbackProductImage from "../assets/hero.png";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import "../styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useDocumentTitle(product ? product.name : "Product");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setQuantity(1);

    API.get(`/products/${id}`)
      .then(({ data }) => {
        if (!active) return;
        setProduct(data.product);
      })
      .catch((error) => {
        if (active) showToast("Product not found", "error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  // Related products in the same category
  useEffect(() => {
    if (!product) return;
    let active = true;
    API.get(`/products?category=${encodeURIComponent(product.category)}&pageSize=4`)
      .then(({ data }) => {
        if (active) {
          setRelated(data.products.filter((p) => p._id !== product._id));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <Skeleton className="detail-skeleton detail-skeleton-hero" />
        <div className="detail-skeleton-row">
          <Skeleton className="detail-skeleton" />
          <Skeleton className="detail-skeleton" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found-card">
          <h1>Product not found</h1>
          <Link to="/shop" className="view-all-link">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const outOfStock = product.countInStock === 0;
  const wished = isInWishlist(product._id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast("Please login to add items to cart", "info");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, quantity);
      showToast("Added to cart", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not add to cart", "error");
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      showToast("Please login to continue", "info");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, quantity);
      navigate("/checkout");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not add to cart", "error");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast("Please write a review", "info");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await API.post(`/products/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      setProduct(data.product);
      setReviewComment("");
      setReviewRating(5);
      showToast("Thanks for your review!", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not submit review", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="product-detail-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <img
              src={product.image || fallbackProductImage}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = fallbackProductImage;
              }}
            />
            {outOfStock && <span className="detail-out-of-stock">Out of Stock</span>}
          </div>
          {product.images?.length > 1 && (
            <div className="detail-thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <span className="detail-brand">{product.brand}</span>
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating">
            <Stars rating={product.rating || 0} size={16} />
            <span className="detail-rating-num">{product.rating || "No"}</span>
            <span className="detail-reviews-count">
              {product.numReviews > 0
                ? `${product.numReviews} review${product.numReviews > 1 ? "s" : ""}`
                : "No reviews yet"}
            </span>
          </div>

          <div className="detail-price">
            <span className="price-big">₹ {product.price.toLocaleString()}</span>
            <span className="price-inclusive">inclusive of all taxes</span>
          </div>

          <div
            className={`stock-badge ${outOfStock ? "out" : ""}`}
            aria-live="polite"
          >
            {outOfStock
              ? "Currently unavailable"
              : product.countInStock <= 5
                ? `Only ${product.countInStock} left in stock`
                : "In stock"}
          </div>

          {!outOfStock && (
            <div className="detail-qty-row">
              <span>Quantity</span>
              <div className="qty-stepper">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.countInStock, q + 1))
                  }
                  aria-label="Increase quantity"
                  disabled={quantity >= product.countInStock}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="detail-actions">
            <button
              className="detail-add-btn"
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              Add to Cart
            </button>
            <button
              className="detail-buy-btn"
              onClick={handleBuyNow}
              disabled={outOfStock}
            >
              Buy Now
            </button>
            <button
              className={`detail-wishlist-btn ${wished ? "active" : ""}`}
              onClick={() => toggleWishlist(product._id)}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wished ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="detail-trust">
            <span>✓ Free shipping over ₹499</span>
            <span>✓ Cash on Delivery</span>
            <span>✓ 7-day returns</span>
          </div>
        </div>
      </div>

      <div className="detail-sections">
        <section className="detail-section">
          <h2>Description</h2>
          <p className="detail-desc">{product.description}</p>
        </section>

        {product.specs?.length > 0 && (
          <section className="detail-section">
            <h2>Specifications</h2>
            <table className="specs-table">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr key={index}>
                    <th>{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="detail-section">
          <h2>Customer Reviews</h2>

          <div className="reviews-summary">
            <div className="reviews-score">
              <strong>{product.rating || "—"}</strong>
              <Stars rating={product.rating || 0} size={18} />
              <span>{product.numReviews} reviews</span>
            </div>

            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Write a review</h3>
              {isAuthenticated ? (
                <>
                  <div className="review-rating-picker">
                    <span>Your rating:</span>
                    <div className="picker-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={`picker-star ${star <= reviewRating ? "active" : ""}`}
                          onClick={() => setReviewRating(star)}
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Share your experience with this product…"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                    required
                  />
                  <button
                    type="submit"
                    className="review-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Review"}
                  </button>
                </>
              ) : (
                <p className="review-login-hint">
                  <Link to="/login">Login</Link> to write a review.
                </p>
              )}
            </form>
          </div>

          <div className="reviews-list">
            {product.reviews?.length === 0 ? (
              <p className="no-reviews">Be the first to review this product.</p>
            ) : (
              product.reviews
                ?.slice()
                .reverse()
                .map((review) => (
                  <div className="review-item" key={review._id}>
                    <div className="review-head">
                      <span className="review-avatar">
                        {review.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                      <div>
                        <strong>{review.name}</strong>
                        <Stars rating={review.rating} size={13} />
                      </div>
                      <time>
                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <div className="section-title">
            <h2>Related Products</h2>
          </div>
          <div className="product-grid">
            {related.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
