import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand">
          <span className="brand-mark">EM</span>
          <span>ElectroMart</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/cart" className="nav-link">
            Cart
          </Link>

          <Link to="/orders" className="nav-link">
            Orders
          </Link>

          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="user-greeting" style={{ fontSize: "0.9rem", color: "var(--text-muted, #94a3b8)" }}>
                Hi, <strong>{user?.name || "User"}</strong>
              </span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;