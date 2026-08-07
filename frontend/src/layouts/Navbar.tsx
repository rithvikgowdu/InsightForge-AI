import { FiBell, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">

      <div>

        <h2 className="text-lg font-semibold text-white">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        <button className="text-slate-300 hover:text-white">
          <FiBell size={20} />
        </button>

        <button className="text-slate-300 hover:text-white">
          <FiUser size={20} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;