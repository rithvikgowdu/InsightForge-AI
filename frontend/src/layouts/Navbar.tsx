import { FiBell, FiUser } from "react-icons/fi";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/analysis": "Analysis",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const pageTitle =
    pageTitles[location.pathname] || "InsightForge AI";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">

      <div>
        <h2 className="text-lg font-semibold text-white">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-6">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <FiBell size={20} />
        </button>


        {/* Profile */}
        <button
          type="button"
          aria-label={`Open profile for ${
            user?.username || "user"
          }`}
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <FiUser size={20} />

          {user?.username && (
            <span className="hidden text-sm font-medium sm:inline">
              {user.username}
            </span>
          )}
        </button>

      </div>

    </header>
  );
}

export default Navbar;