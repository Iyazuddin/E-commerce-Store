import { createContext, useCallback, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "./useAuth";
import { useToast } from "./ToastContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [items, setItems] = useState([]);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    try {
      const { data } = await API.get("/wishlist");
      setItems(data.wishlist || []);
    } catch (error) {
      // ignore
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, isAuthenticated]);

  const isInWishlist = useCallback(
    (productId) =>
      items.some((item) => item.product?._id?.toString() === productId?.toString()),
    [items],
  );

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      showToast("Please login to save items", "info");
      return false;
    }

    try {
      const existing = items.find(
        (item) => item.product?._id?.toString() === productId?.toString(),
      );

      if (existing) {
        await API.delete(`/wishlist/${existing._id}`);
        showToast("Removed from wishlist", "info");
      } else {
        await API.post("/wishlist", { product: productId });
        showToast("Added to wishlist ❤️", "success");
      }

      await fetchWishlist();
      return true;
    } catch (error) {
      showToast(error.response?.data?.message || "Could not update wishlist", "error");
      return false;
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      await fetchWishlist();
    } catch (error) {
      showToast("Could not remove item", "error");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, isInWishlist, toggleWishlist, removeItem, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
