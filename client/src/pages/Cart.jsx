import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

 const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await API.post(
      "/orders",
      {
        shippingAddress: {
          address: "Delhi",
          city: "Delhi",
          postalCode: "110001",
          country: "India",
        },
        paymentMethod: "Cash on Delivery",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(data.message);

    navigate("/orders");
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to place order");
  }
};

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item._id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h2>{item.product.name}</h2>

                  <p>{item.product.brand}</p>

                  <h3>₹ {item.product.price.toLocaleString()}</h3>

                  <span>Quantity : {item.quantity}</span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Amount</span>
              <span>₹ {total.toLocaleString()}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;