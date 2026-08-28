import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CSSProperties, FormEvent } from "react";

import { registerUser } from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerUser({
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          InsightForge <span style={styles.logoAccent}>AI</span>
        </div>

        <div style={styles.header}>
          <h1 style={styles.title}>Create your account</h1>

          <p style={styles.subtitle}>
            Join InsightForge AI and start turning repository
            issues into product opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              style={styles.input}
              minLength={8}
              required
            />

            <span style={styles.hint}>
              Password must contain at least 8 characters.
            </span>
          </div>

          {error && (
            <div style={styles.error} role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </p>

        <Link to="/" style={styles.homeLink}>
          ← Back to home
        </Link>
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
    maxWidth: "430px",
    padding: "40px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)",
  },

  logo: {
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "21px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "#172033",
  },

  logoAccent: {
    color: "#2563eb",
  },

  header: {
    marginBottom: "28px",
    textAlign: "center",
  },

  title: {
    margin: 0,
    fontSize: "29px",
    letterSpacing: "-1px",
    color: "#172033",
  },

  subtitle: {
    margin: "10px 0 0",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#64748b",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    fontSize: "13px",
    fontWeight: 650,
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    color: "#172033",
    background: "#ffffff",
  },

  hint: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  error: {
    padding: "11px 12px",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: "13px",
  },

  button: {
    marginTop: "4px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  buttonDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  footerText: {
    margin: "24px 0 0",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
  },

  link: {
    color: "#2563eb",
    fontWeight: 700,
    textDecoration: "none",
  },

  homeLink: {
    display: "block",
    marginTop: "19px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "12px",
    textDecoration: "none",
  },
};

export default Register;