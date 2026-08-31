import {
  FiHome,
  FiSearch,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FiSearch,
    label: "Analysis",
    path: "/analysis",
  },
  {
    icon: FiBarChart2,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: FiSettings,
    label: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="rounded text-left text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          aria-label="Go to Dashboard"
        >
          InsightForge AI
        </button>
      </div>


      {/* Navigation */}
      <nav
        className="flex-1 p-4"
        aria-label="Main navigation"
      >
        <ul className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/40
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} />

                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}

        </ul>
      </nav>


      {/* Bottom Actions */}
      <div className="border-t border-slate-800 p-4">

        {/* Help */}
        <button
          type="button"
          onClick={() => {
            // Help page can be connected later.
          }}
          className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <FiHelpCircle />

          <span>Help</span>
        </button>


        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/40"
        >
          <FiLogOut />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;