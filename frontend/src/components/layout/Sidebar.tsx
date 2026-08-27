function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-slate-800 bg-slate-900 p-4 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:p-6">
      
      {/* Navigation heading */}
      <h2 className="mb-4 text-lg font-semibold text-white lg:mb-6">
        Navigation
      </h2>

      {/* Navigation */}
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:space-y-3 lg:gap-0 lg:overflow-visible lg:pb-0">

        <button
          type="button"
          className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-left text-sm font-medium text-white transition hover:bg-slate-700 lg:w-full"
        >
          Dashboard
        </button>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-left text-sm font-medium text-white transition hover:bg-slate-700 lg:w-full"
        >
          Analysis
        </button>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-left text-sm font-medium text-white transition hover:bg-slate-700 lg:w-full"
        >
          Reports
        </button>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-left text-sm font-medium text-white transition hover:bg-slate-700 lg:w-full"
        >
          Settings
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;