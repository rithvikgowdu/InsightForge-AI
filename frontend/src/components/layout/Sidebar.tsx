import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.navigationTitle}>
        WORKSPACE
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          <span style={styles.icon}>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/analysis"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          <span style={styles.icon}>✦</span>
          Analysis
        </NavLink>

        <NavLink
          to="/reports"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          <span style={styles.icon}>▤</span>
          Reports
        </NavLink>
      </nav>

      <div style={styles.bottom}>
        <div style={styles.tip}>
          <span style={styles.tipTitle}>
            InsightForge AI
          </span>

          <span style={styles.tipText}>
            Turn recurring issues into product opportunities.
          </span>
        </div>
      </div>
    </aside>
  );
}

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: "220px",
    minHeight: "calc(100vh - 61px)",
    boxSizing: "border-box",
    padding: "24px 15px",
    background: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
  },

  navigationTitle: {
    padding: "0 12px",
    marginBottom: "10px",
    fontSize: "9px",
    fontWeight: 800,
    letterSpacing: "1.2px",
    color: "#94a3b8",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    padding: "11px 12px",
    borderRadius: "8px",
    color: "#64748b",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 600,
  },

  activeLink: {
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 700,
  },

  icon: {
    width: "20px",
    textAlign: "center",
    fontSize: "15px",
  },

  bottom: {
    marginTop: "auto",
    paddingTop: "25px",
  },

  tip: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "14px",
    borderRadius: "10px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },

  tipTitle: {
    fontSize: "11px",
    fontWeight: 750,
    color: "#334155",
  },

  tipText: {
    fontSize: "10px",
    lineHeight: 1.5,
    color: "#94a3b8",
  },
};

export default Sidebar;