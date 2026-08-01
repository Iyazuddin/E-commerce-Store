import { useEffect, useState } from "react";
import API from "../services/api";
import fallbackProductImage from "../assets/hero.png";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post(
        "/cart",
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="home-page">
      <section className="hero-panel page-frame">
        <div className="hero-copy">
          <span className="eyebrow">Curated electronics store</span>
          <h1>Premium gadgets, presented with a cleaner shopping experience.</h1>
          <p>
            Browse standout devices, compare with confidence, and move from discovery to checkout with a more polished storefront.
          </p>

          <div className="hero-actions">
            <a href="#products" className="hero-button primary">
              Shop products
            </a>
            <a href="/cart" className="hero-button secondary">
              Review cart
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
          <div className="hero-visual-card">
            <span>Featured setup</span>
            <h3>Design that feels more premium from the first glance.</h3>
            <p>
              Strong contrast, layered surfaces, and better spacing make the shop easier to scan.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">New arrivals</span>
            <h2>Our Products</h2>
          </div>
          <p>Clean product cards with stronger hierarchy and clearer calls to action.</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card glass-panel" key={product._id}>
              <div className="product-image-wrap">
                <img
                  src={product.image || fallbackProductImage}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = fallbackProductImage;
                  }}
                />
              </div>

              <div className="product-body">
                <div className="product-meta">
                  <span className="product-brand">{product.brand}</span>
                  <span className="product-price">₹ {product.price.toLocaleString()}</span>
                </div>

                <h3>{product.name}</h3>

                <button className="product-action" onClick={() => addToCart(product._id)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;