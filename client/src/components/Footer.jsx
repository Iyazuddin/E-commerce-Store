import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>NovaCart</h2>
          <p>
            Your one-stop destination for premium electronics and gadgets.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/cart">Cart</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/contact">Support (Web3Forms)</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📧 support@novacart.com</p>

          <p>📞 +91 9876543210</p>

          <p>📍 New Delhi, India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 NovaCart. Powered by Web3Forms & React.
      </p>
    </footer>
  );
}

export default Footer;