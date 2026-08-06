import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Wraps routes that require a logged-in user. Redirects to /login
// and remembers where the user was heading so we can send them back.
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;
