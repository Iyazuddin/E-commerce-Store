import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Skeleton from "../components/Skeleton";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/Orders.css";

const STATUS_STYLES = {
  Pending: { label: "Pending", className: "status-pending" },
  Confirmed: { label: "Confirmed", className: "status-confirmed" },
  Shipped: { label: "Shipped", className: "status-shipped" },
  Delivered: { label: "Delivered", className: "status-delivered" },
  Cancelled: { label: "Cancelled", className: "status-cancelled" },
};

function Orders() {
  useDocumentTitle("My Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        if (active) setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchOrders();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="orders-container">
        <Skeleton className="orders-title-skeleton" />
        <Skeleton className="orders-card-skeleton" />
        <Skeleton className="orders-card-skeleton" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1 className="orders-title">📦 My Orders</h1>
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Place your first order to see it here.</p>
          <Link to="/shop" className="empty-shop-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">📦 My Orders</h1>
      <p className="orders-subtitle">{orders.length} order{orders.length > 1 ? "s" : ""}</p>

      {orders.map((order) => {
        const status = STATUS_STYLES[order.orderStatus] || STATUS_STYLES.Pending;

        return (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <h3>Order</h3>
                <p className="order-id">#{order._id.slice(-8)}</p>
              </div>

              <div>
                <h3>Placed On</h3>
                <p>
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <h3>Items</h3>
                <p>{order.orderItems?.reduce((sum, i) => sum + i.quantity, 0) || 0}</p>
              </div>

              <div>
                <h3>Total</h3>
                <p>₹ {order.totalPrice.toLocaleString()}</p>
              </div>

              <div>
                <h3>Status</h3>
                <span className={`status ${status.className}`}>{status.label}</span>
              </div>
            </div>

            <div className="products-list">
              {order.orderItems
                ?.filter((item) => item && (item.product || item.name))
                .map((item) => {
                  const image = item.image || item.product?.image;
                  const name = item.name || item.product?.name;
                  const price = item.price ?? item.product?.price;

                  return (
                    <div className="product-row" key={item._id}>
                      <img src={image} alt={name} />
                      <div className="product-info">
                        <h4>{name}</h4>
                        <p>₹ {(price || 0).toLocaleString()} each</p>
                        <span>Total: ₹ {((price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                      <div className="qty">Qty : {item.quantity}</div>
                    </div>
                  );
                })}
            </div>

            <div className="order-address">
              <h4>Delivering to</h4>
              <p>
                {order.shippingAddress?.fullName} · {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country} ·{" "}
                {order.shippingAddress?.phone}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
