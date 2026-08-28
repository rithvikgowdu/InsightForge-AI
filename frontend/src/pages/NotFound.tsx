import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          InsightForge <span style={styles.logoAccent}>AI</span>
        </div>

        <div style={styles.code}>404</div>

        <h1 style={styles.title}>Page not found</h1>

        <p style={styles.message}>
          The page you're looking for doesn't exist or may have
          been moved.
        </p>

        <div style={styles.actions}>
          <Link to="/" style={styles.primaryButton}>
            Back to Home
          </Link>

          <Link to="/dashboard" style={styles.secondaryButton}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    background: "#f8fafc",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "50px 40px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)",
  },

  logo: {
    marginBottom: "35px",
    fontSize: "21px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "#172033",
  },

  logoAccent: {
    color: "#2563eb",
  },

  code: {
    fontSize: "72px",
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "-3px",
    color: "#2563eb",
  },

  title: {
    margin: "20px 0 0",
    fontSize: "28px",
    letterSpacing: "-1px",
    color: "#172033",
  },

  message: {
    maxWidth: "380px",
    margin: "12px auto 0",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "28px",
  },

  primaryButton: {
    padding: "11px 17px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  secondaryButton: {
    padding: "11px 17px",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },
};

export default NotFound;