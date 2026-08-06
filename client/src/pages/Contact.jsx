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
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "NovaCart Support Request",
          message: formData.message,
          from_name: "NovaCart Customer Inquiry",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
      } else {
        setStatus({
          loading: false,
          success: false,
          error: result.message || "Failed to submit form.",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);

      setStatus({
        loading: false,
        success: false,
        error: "Network error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <span className="eyebrow">📬 Let's Connect</span>
          <h1>Get in Touch</h1>
          <p>
            Have questions or feedback? We're here to help. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="contact-main-grid">
        <div className="contact-info-section">
          <div className="info-card glass-panel">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>support@novacart.com</p>
            <span className="info-subtitle">Response within 24 hours</span>
          </div>

          <div className="info-card glass-panel">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
            <span className="info-subtitle">Mon-Fri, 9 AM - 6 PM IST</span>
          </div>

          <div className="info-card glass-panel">
            <div className="info-icon">📍</div>
            <h3>Office</h3>
            <p>123 Tech Street, Bangalore</p>
            <span className="info-subtitle">Karnataka 560001, India</span>
          </div>

          <div className="info-card glass-panel">
            <div className="info-icon">💼</div>
            <h3>Business Inquiries</h3>
            <p>partnerships@novacart.com</p>
            <span className="info-subtitle">For collaborations & recruiting</span>
          </div>

          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <span>in</span>
              </a>
              <a href="https://github.com/Iyazuddin" target="_blank" rel="noopener noreferrer" className="social-icon">
                <span>gh</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <span>tw</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-section glass-panel">
          <div className="form-header">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly.</p>
          </div>

          {status.success && (
            <div className="contact-alert success">
              <span className="alert-icon">✅</span>
              <div>
                <strong>Message Sent Successfully!</strong>
                <p>We'll respond within 24 hours.</p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="contact-alert error">
              <span className="alert-icon">⚠️</span>
              <div>
                <strong>Error</strong>
                <p>{status.error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
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
                <label>Email Address *</label>
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
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status.loading}
            >
              {status.loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
