import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/ToastContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/Login.css";

function Login() {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      await login(formData.email, formData.password);
      showToast("Login successful!", "success");
      // Send the user back where they were headed (e.g. from a protected route)
      const from = location.state?.from || "/";
      navigate(from);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        {errorMsg && <div className="error-alert" style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.9rem" }}>{errorMsg}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;