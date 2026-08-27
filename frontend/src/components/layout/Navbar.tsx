function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-4 sm:px-6">
      
      {/* Brand */}
      <h1 className="text-lg font-bold text-white sm:text-xl">
        InsightForge AI
      </h1>

      {/* Profile */}
      <button
        type="button"
        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:px-4"
      >
        Profile
      </button>

    </header>
  );
}

export default Navbar;