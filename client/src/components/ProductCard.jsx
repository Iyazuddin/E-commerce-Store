import { Link, useNavigate } from "react-router-dom";
import Stars from "./Stars";
import fallbackProductImage from "../assets/hero.png";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

function ProductCard({ product, index = 0 }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast("Please login to add items to cart", "info");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, 1);
      showToast(`${product.name} added to cart`, "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not add to cart", "error");
    }
  };

  const handleWishlist = async () => {
    await toggleWishlist(product._id);
  };

  const outOfStock = product.countInStock === 0;
  const wished = isInWishlist(product._id);

  return (
    <article className="product-card glass-panel" style={{ "--i": index }}>
      <div className="product-image-wrap">
        <Link to={`/product/${product._id}`} aria-label={product.name}>
          <img
            src={product.image || fallbackProductImage}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackProductImage;
            }}
          />
        </Link>
        {outOfStock && <span className="out-of-stock-badge">Out of Stock</span>}
        <button
          className={`wishlist-heart ${wished ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          title={wished ? "Remove from wishlist" : "Add to wishlist"}
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
        </button>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <span className="product-rating">
            <Stars rating={product.rating || 0} />
            {product.numReviews > 0 && (
              <em className="rating-count">({product.numReviews})</em>
            )}
          </span>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <div className="product-price-row">
          <span className="product-price">₹ {product.price.toLocaleString()}</span>
        </div>

        <button
          className="product-action"
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
