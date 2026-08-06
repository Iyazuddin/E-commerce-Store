import { createContext, useCallback, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "./useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.get("/cart");
      setItems((data.cart || []).filter((item) => item && item.product));
    } catch (error) {
      // Ignore transient errors; the guard will handle auth issues
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load the cart whenever auth state changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart, isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await API.post("/cart", { product: productId, quantity });
    await fetchCart();
    return data;
  };

  const updateQuantity = async (id, quantity) => {
    const { data } = await API.put(`/cart/${id}`, { quantity });
    await fetchCart();
    return data;
  };

  const removeItem = async (id) => {
    const { data } = await API.delete(`/cart/${id}`);
    await fetchCart();
    return data;
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
