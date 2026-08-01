import { useState } from "react";
import { useAuth } from "../context/useAuth";
import "../styles/Contact.css";

function Contact() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
    access_key:
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      "073173f6-0662-464c-a86c-7ddc9ca04c71",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status.error || status.success) {
      setStatus({ loading: false, success: false, error: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus({ loading: true, success: false, error: "" });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: formData.access_key,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "ElectroMart Support Request",
          message: formData.message,
          from_name: "ElectroMart Customer Inquiry",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData((prev) => ({ ...prev, subject: "", message: "" }));
      } else {
        setStatus({
          loading: false,
          success: false,
          error: result.message || "Failed to submit form to Web3Forms.",
        });
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus({
        loading: false,
        success: false,
        error: "Network error occurred while connecting to Web3Forms.",
      });
    }
  };

  return (
    <div className="contact-page page-frame">
      <div className="contact-container glass-panel">
        <div className="contact-header">
          <span className="eyebrow">Web3Forms Integration</span>
          <h2>Get in Touch & Support</h2>
          <p>
            Have questions about an order or product? Send us a message directly
            via <strong>Web3Forms</strong>.
          </p>
        </div>

        {status.success && (
          <div className="contact-alert success">
            ✅ <strong>Message Sent Successfully!</strong> We will get back to
            you shortly.
          </div>
        )}

        {status.error && (
          <div className="contact-alert error">
            ⚠️ <strong>Error:</strong> {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Web3Forms Access Key</label>
            <input
              type="text"
              name="access_key"
              value={formData.access_key}
              onChange={handleChange}
              placeholder="e.g. YOUR_WEB3FORMS_ACCESS_KEY"
              required
            />
            <small style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Get your free key at{" "}
              <a
                href="https://web3forms.com/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--accent)" }}
              >
                web3forms.com
              </a>
            </small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Order Inquiry / Product Feedback"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status.loading}
          >
            {status.loading ? "Sending via Web3Forms..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
