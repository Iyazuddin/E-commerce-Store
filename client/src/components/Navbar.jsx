import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = search.trim();
    setMenuOpen(false);
    navigate(keyword ? `/shop?keyword=${encodeURIComponent(keyword)}` : "/shop");
    setSearch("");
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand">
          <img src="/favicon.svg" alt="NovaCart logo" className="brand-logo" />
          <span>NovaCart</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch} role="search">
          <svg
            className="nav-search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="nav-links">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/shop" className={isActive("/shop")}>
            Shop
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className={isActive("/orders")}>
              Orders
            </Link>
          )}
          <Link to="/contact" className={isActive("/contact")}>
            Contact Us
          </Link>
        </div>

        <div className="nav-actions">
          <Link
            to={isAuthenticated ? "/wishlist" : "/login"}
            className="nav-icon-btn"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="nav-icon-btn cart-btn"
            aria-label={`Cart, ${count} items`}
            title="Cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {isAuthenticated ? (
            <div className="nav-user">
              <span className="user-greeting">
                Hi, <strong>{user?.name?.split(" ")[0] || "User"}</strong>
              </span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link nav-register">
                Register
              </Link>
            </div>
          )}

          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              Orders
            </Link>
          )}
          <Link to="/wishlist" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Wishlist
          </Link>
          <Link to="/cart" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <Link to="/contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          {isAuthenticated ? (
            <button
              className="mobile-menu-link mobile-logout"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
