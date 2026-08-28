import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import type { CSSProperties } from "react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        style={styles.logoButton}
      >
        <span style={styles.logo}>
          InsightForge
        </span>

        <span style={styles.logoAccent}>
          AI
        </span>
      </button>

      <div style={styles.right}>
        <span style={styles.status}>
          <span style={styles.statusDot} />
          AI Engine Ready
        </span>

        <button
          type="button"
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles: Record<string, CSSProperties> = {
  navbar: {
    height: "61px",
    boxSizing: "border-box",
    padding: "0 22px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoButton: {
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: 0,
    background: "transparent",
    cursor: "pointer",
    fontSize: "19px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },

  logo: {
    color: "#172033",
  },

  logoAccent: {
    marginLeft: "4px",
    color: "#2563eb",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#64748b",
    fontSize: "11px",
    fontWeight: 600,
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  logoutButton: {
    padding: "8px 13px",
    border: "1px solid #e2e8f0",
    borderRadius: "7px",
    background: "#ffffff",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 650,
    cursor: "pointer",
  },
};

export default Navbar;