import {
  FiHome,
  FiSearch,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
  },
  {
    icon: FiSearch,
    label: "Analysis",
  },
  {
    icon: FiBarChart2,
    label: "Reports",
  },
  {
    icon: FiSettings,
    label: "Settings",
  },
];

function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-xl font-bold text-white">
          InsightForge AI
        </h1>

      </div>

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <button
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-slate-300
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  <Icon size={20} />

                  {item.label}
                </button>
              </li>
            );
          })}

        </ul>

      </nav>

      <div className="border-t border-slate-800 p-4">

        <button className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">

          <FiHelpCircle />

          Help

        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10">

          <FiLogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;