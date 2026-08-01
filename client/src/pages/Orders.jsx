import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Place your first order to see it here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <h3>Order ID</h3>
                <p>{order._id}</p>
              </div>

              <div>
                <h3>Total</h3>
                <p>₹ {order.totalPrice.toLocaleString()}</p>
              </div>

              <div>
                <h3>Payment</h3>
                <p>{order.paymentMethod}</p>
              </div>

              <div>
                <h3>Status</h3>
                <span className="status">Placed</span>
              </div>
            </div>

            <div className="products-list">
              {order.orderItems.map((item) => (
                <div className="product-row" key={item._id}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />

                  <div className="product-info">
                    <h4>{item.product.name}</h4>

                    <p>{item.product.brand}</p>

                    <span>
                      ₹ {item.product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="qty">
                    Qty : {item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;