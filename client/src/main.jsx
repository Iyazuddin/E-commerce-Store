import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
