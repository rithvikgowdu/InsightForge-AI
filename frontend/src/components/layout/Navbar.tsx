import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#2563eb",
        color: "white",
        padding: "15px 20px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>InsightForge AI</span>

      <button
        type="button"
        onClick={handleLogout}
        style={{
          background: "white",
          color: "#2563eb",
          border: "none",
          borderRadius: "6px",
          padding: "8px 14px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;