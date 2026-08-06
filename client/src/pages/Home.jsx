import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Home() {
  useDocumentTitle("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products?pageSize=8");
        if (active) setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="home-page">
      <section className="hero-panel page-frame">
        <div className="hero-copy">
          <span className="eyebrow">⚡ Next-Gen Tech Store</span>
          <h1>Empowering Your Digital Lifestyle With Cutting-Edge Innovation.</h1>
          <p>
            Discover flagship smartphones, immersive audio gear, ultra-portable laptops, and smart wearables built to elevate your daily workflow and entertainment.
          </p>

          <div className="hero-actions">
            <a href="#products" className="hero-button primary">
              Shop Products
            </a>
            <a href="/cart" className="hero-button secondary">
              View Cart
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{products.length}</strong>
              <span>Products ready</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Cart checkout flow</span>
            </div>
            <div>
              <strong>Modern</strong>
              <span>Responsive storefront</span>
            </div>
          </div>
        </div>

        <div className="hero-visual glass-panel">
          <figure className="hero-product">
            <img src="/Smartphone1.jpg" alt="NovaCart flagship smartphone" className="hero-product-img" />
            <figcaption className="hero-product-badge">
              <span aria-hidden="true">⚡</span> Flagship Showcase
            </figcaption>
          </figure>
          <div className="hero-visual-card">
            <h3>Uncompromising tech, seamless shopping.</h3>
            <p>
              Handpicked performance gear with lightning-fast checkout and secure ordering.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">New arrivals</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop" className="view-all-link">
            View all products →
          </Link>
        </div>

        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="product-card skeleton-card" key={index}>
                <Skeleton className="skeleton-img" />
                <Skeleton className="skeleton-line short" />
                <Skeleton className="skeleton-line" />
                <Skeleton className="skeleton-line long" />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;