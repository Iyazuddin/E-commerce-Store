import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "../styles/Cart.css";

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_PRICE = 49;

function Cart() {
  useDocumentTitle("Cart");
  const navigate = useNavigate();
  const { items, count, subtotal, updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleQuantity = async (id, quantity) => {
    try {
      await updateQuantity(id, quantity);
    } catch (error) {
      showToast(error.response?.data?.message || "Could not update quantity", "error");
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeItem(id);
      showToast("Item removed from cart", "info");
    } catch (error) {
      showToast("Could not remove item", "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-title">🛒 My Cart</h1>
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="empty-shop-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 My Cart</h1>
      <p className="cart-subtitle">{count} item{count > 1 ? "s" : ""} in your cart</p>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="shipping-progress">
            <div className="shipping-progress-head">
              <span>
                {shipping === 0
                  ? "🎉 You've unlocked FREE shipping!"
                  : `Add ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for FREE shipping`}
              </span>
            </div>
            <div className="shipping-progress-bar">
              <div className="shipping-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {items.map((item) => {
            const outOfStock = item.product.countInStock === 0;
            const maxQty = item.product.countInStock || 1;

            return (
              <div className="cart-card" key={item._id}>
                <Link to={`/product/${item.product._id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-image"
                  />
                </Link>

                <div className="cart-details">
                  <Link to={`/product/${item.product._id}`} className="cart-name-link">
                    <h2>{item.product.name}</h2>
                  </Link>
                  <p>{item.product.brand}</p>
                  <h3>₹ {item.product.price.toLocaleString()}</h3>

                  {outOfStock ? (
                    <span className="cart-out-of-stock">Out of stock</span>
                  ) : (
                    <div className="qty-stepper">
                      <button
                        onClick={() => handleQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item._id, item.quantity + 1)}
                        disabled={item.quantity >= maxQty}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="cart-item-side">
                  <span className="cart-item-total">
                    ₹ {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items ({count})</span>
            <span>₹ {subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹ ${shipping}`}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-shopping">
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
