function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <h1 className="text-xl font-bold text-white">
        InsightForge AI
      </h1>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Profile
      </button>
    </header>
  );
}

export default Navbar;