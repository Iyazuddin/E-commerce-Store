import { Link } from "react-router-dom";
import Stars from "../components/Stars";
import fallbackProductImage from "../assets/hero.png";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "../styles/Wishlist.css";

function Wishlist() {
  useDocumentTitle("Wishlist");
  const { items, removeItem } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const moveToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      showToast(`${product.name} moved to cart`, "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not add to cart", "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-container">
        <h1 className="wishlist-title">❤️ My Wishlist</h1>
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>Save products you love and find them here later.</p>
          <Link to="/shop" className="empty-cta-btn">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">❤️ My Wishlist</h1>
      <p className="wishlist-subtitle">{items.length} saved item{items.length > 1 ? "s" : ""}</p>

      <div className="wishlist-grid">
        {items.map(({ _id, product }) => {
          if (!product) return null;
          const outOfStock = product.countInStock === 0;

          return (
            <div className="wishlist-card" key={_id}>
              <Link to={`/product/${product._id}`} className="wishlist-image-link">
                <img
                  src={product.image || fallbackProductImage}
                  alt={product.name}
                  className="wishlist-image"
                  onError={(e) => {
                    e.currentTarget.src = fallbackProductImage;
                  }}
                />
              </Link>

              <div className="wishlist-info">
                <span className="wishlist-brand">{product.brand}</span>
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <div className="wishlist-rating">
                  <Stars rating={product.rating || 0} size={13} />
                  <span>({product.numReviews || 0})</span>
                </div>
                <div className="wishlist-price">
                  ₹ {product.price.toLocaleString()}
                </div>
              </div>

              <div className="wishlist-actions">
                <button
                  className="move-to-cart-btn"
                  onClick={() => moveToCart(product)}
                  disabled={outOfStock}
                >
                  {outOfStock ? "Out of Stock" : "Move to Cart"}
                </button>
                <button
                  className="remove-wishlist-btn"
                  onClick={() => removeItem(_id)}
                  aria-label="Remove from wishlist"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
