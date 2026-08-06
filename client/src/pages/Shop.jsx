import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/Shop.css";

const SORTS = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name_asc", label: "Name: A to Z" },
];

function Shop() {
  useDocumentTitle("Shop");
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const inStock = searchParams.get("inStock") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, totalCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/products/categories");
        setCategories(data.categories || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (inStock) params.set("inStock", "true");
    params.set("page", page);
    params.set("pageSize", "8");

    API.get(`/products?${params.toString()}`)
      .then(({ data }) => {
        if (!active) return;
        setProducts(data.products);
        setMeta({ page: data.page, pages: data.pages, totalCount: data.totalCount });
      })
      .catch((error) => {
        console.log(error);
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [keyword, category, sort, minPrice, maxPrice, inStock, page]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    // Reset to page 1 whenever a filter changes
    if (!("page" in updates)) next.delete("page");
    setSearchParams(next);
  };

  const currentCategory = category;
  const displayedKeyword = keyword;

  const resultLabel = useMemo(() => {
    if (loading) return "Loading…";
    return `${meta.totalCount} product${meta.totalCount === 1 ? "" : "s"}`;
  }, [loading, meta.totalCount]);

  return (
    <div className="shop-container">
      <header className="shop-header">
        <div>
          <span className="eyebrow">Browse catalog</span>
          <h1 className="shop-title">
            {currentCategory || (displayedKeyword ? `Results for "${displayedKeyword}"` : "Shop All Products")}
          </h1>
          <p className="shop-result-count">{resultLabel}</p>
        </div>
        <label className="sort-label">
          <span>Sort by</span>
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            aria-label="Sort products"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <button
              className={`filter-chip ${currentCategory === "" ? "active" : ""}`}
              onClick={() => updateParams({ category: "" })}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${currentCategory === cat ? "active" : ""}`}
                onClick={() => updateParams({ category: cat })}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h3>Price range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min ₹"
                min="0"
                value={minPrice}
                onChange={(e) => updateParams({ minPrice: e.target.value })}
                aria-label="Minimum price"
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max ₹"
                min="0"
                value={maxPrice}
                onChange={(e) => updateParams({ maxPrice: e.target.value })}
                aria-label="Maximum price"
              />
            </div>
          </div>

          <label className="filter-check">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => updateParams({ inStock: e.target.checked ? "true" : "" })}
            />
            In stock only
          </label>
        </aside>

        <main className="shop-main">
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
          ) : products.length === 0 ? (
            <div className="empty-shop">
              <h2>No products found</h2>
              <p>Try adjusting your search or filters.</p>
              <button
                className="reset-filters-btn"
                onClick={() => setSearchParams({})}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {meta.pages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={page <= 1}
                    onClick={() => updateParams({ page: page - 1 })}
                  >
                    ← Prev
                  </button>
                  <span className="page-info">
                    Page {meta.page} of {meta.pages}
                  </span>
                  <button
                    className="page-btn"
                    disabled={page >= meta.pages}
                    onClick={() => updateParams({ page: page + 1 })}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Shop;
