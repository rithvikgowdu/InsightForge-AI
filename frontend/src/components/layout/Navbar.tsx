import { useState } from "react";
import { FiBell, FiUser, FiX } from "react-icons/fi";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analysis": "Analysis",
  "/reports": "Reports",
  "/settings": "Settings",
};

const pageTitle =
  pageTitles[location.pathname] || "InsightForge AI";
  const { user } = useAuth();

  const [showNotifications, setShowNotifications] =
    useState(false);

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">

      {/* Page title */}
      <div>
        <h2 className="text-lg font-semibold text-white">
  {pageTitle}
</h2>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotifications((value) => !value)
            }
            aria-label="Notifications"
            aria-expanded={showNotifications}
            className="relative rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FiBell size={20} />

            {/* Notification indicator */}
            <span
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500"
            />
          </button>


          {/* Notification panel */}
          {showNotifications && (
            <div
              role="dialog"
              aria-label="Notifications"
              className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl"
            >
              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  aria-label="Close notifications"
                  className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <FiX size={16} />
                </button>

              </div>

              <div className="mt-4 rounded-lg border border-dashed border-slate-700 p-4 text-center">
                <p className="text-sm text-slate-400">
                  No new notifications.
                </p>
              </div>
            </div>
          )}

        </div>


        {/* Profile */}
        <button
          type="button"
          onClick={() => navigate("/settings")}
          aria-label={
            user?.username
              ? `Open profile for ${user.username}`
              : "Open profile settings"
          }
          className="flex items-center gap-2 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <FiUser size={20} />

          {user?.username && (
            <span className="hidden text-sm sm:inline">
              {user.username}
            </span>
          )}
        </button>

      </div>

    </header>
  );
}

export default Navbar;