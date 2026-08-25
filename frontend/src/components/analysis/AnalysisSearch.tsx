import { FiSearch } from "react-icons/fi";

function AnalysisSearch() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Discover Product Opportunities
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Analyze public discussions to uncover customer problems,
          feature requests, emerging trends, and business opportunities.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Enter an industry or topic..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Analyze
        </button>
      </div>
    </div>
  );
}

export default AnalysisSearch;