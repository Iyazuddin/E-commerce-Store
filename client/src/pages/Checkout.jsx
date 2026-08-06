import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "../styles/Checkout.css";

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_PRICE = 49;

const initialState = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  phone: "",
};

function Checkout() {
  useDocumentTitle("Checkout");
  const navigate = useNavigate();
  const { items, subtotal, fetchCart } = useCart();
  const { showToast } = useToast();

  const [form, setForm] = useState(initialState);
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const { data } = await API.post("/orders", {
        shippingAddress: form,
        paymentMethod: "Cash on Delivery",
      });
      setPlacedOrder(data.order);
      await fetchCart();
      showToast("Order placed successfully 🎉", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Could not place order", "error");
    } finally {
      setPlacing(false);
    }
  };

  // Success screen
  if (placedOrder) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-check">✓</div>
          <h1>Order Placed!</h1>
          <p>
            Thank you, <strong>{placedOrder.shippingAddress.fullName}</strong>. Your
            order has been confirmed and will be delivered soon.
          </p>
          <div className="success-details">
            <div>
              <span>Order ID</span>
              <strong>{placedOrder._id}</strong>
            </div>
            <div>
              <span>Total Paid</span>
              <strong>₹ {placedOrder.totalPrice.toLocaleString()}</strong>
            </div>
            <div>
              <span>Payment</span>
              <strong>{placedOrder.paymentMethod}</strong>
            </div>
          </div>
          <div className="success-actions">
            <Link to="/orders" className="success-primary-btn">
              View My Orders
            </Link>
            <Link to="/shop" className="success-secondary-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h1>Your cart is empty</h1>
          <p>Add some products before checking out.</p>
          <Link to="/shop" className="empty-cta-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>

          <div className="checkout-field">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Arjun Mehta"
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="address">Street Address *</label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, area"
              required
            />
          </div>

          <div className="checkout-field-row">
            <div className="checkout-field">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="checkout-field">
              <label htmlFor="state">State *</label>
              <input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
          </div>

          <div className="checkout-field-row">
            <div className="checkout-field">
              <label htmlFor="postalCode">PIN Code *</label>
              <input
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="e.g. 110001"
                pattern="[0-9]{6}"
                title="6-digit PIN code"
                required
              />
            </div>
            <div className="checkout-field">
              <label htmlFor="country">Country *</label>
              <input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              title="10-digit phone number"
              required
            />
          </div>

          <button className="place-order-btn" type="submit" disabled={placing}>
            {placing ? "Placing order…" : `Place Order · ₹${total.toLocaleString()}`}
          </button>
          <p className="cod-note">💵 Cash on Delivery — no advance payment needed.</p>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {items.map((item) => (
              <div className="summary-item" key={item._id}>
                <img src={item.product.image} alt={item.product.name} />
                <div className="summary-item-info">
                  <strong>{item.product.name}</strong>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  ₹ {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
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
          </div>

          {shipping > 0 && (
            <p className="free-ship-hint">
              Add ₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for
              <strong> FREE shipping</strong>.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
