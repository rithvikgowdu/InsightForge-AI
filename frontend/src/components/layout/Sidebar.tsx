function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-white">
        Navigation
      </h2>

      <nav className="space-y-3">
        <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-left text-white hover:bg-slate-700">
          Dashboard
        </button>

        <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-left text-white hover:bg-slate-700">
          Analysis
        </button>

        <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-left text-white hover:bg-slate-700">
          Reports
        </button>

        <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-left text-white hover:bg-slate-700">
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;