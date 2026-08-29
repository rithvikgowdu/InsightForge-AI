function AnalysisFilters() {
  return (
    <section
      aria-labelledby="analysis-filters-title"
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <div className="mb-5">
        <h2
          id="analysis-filters-title"
          className="text-base font-semibold text-white"
        >
          Analysis Filters
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Choose the sources and time period to analyze.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Sources */}
        <div>
          <label
            htmlFor="source"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Sources
          </label>

          <select
            id="source"
            name="source"
            defaultValue="all"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="all">
              Reddit + GitHub
            </option>

            <option value="reddit">
              Reddit
            </option>

            <option value="github">
              GitHub
            </option>
          </select>
        </div>


        {/* Time Range */}
        <div>
          <label
            htmlFor="timeRange"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Time Range
          </label>

          <select
            id="timeRange"
            name="timeRange"
            defaultValue="30"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="7">
              Last 7 days
            </option>

            <option value="30">
              Last 30 days
            </option>

            <option value="90">
              Last 90 days
            </option>

            <option value="365">
              Last year
            </option>
          </select>
        </div>


        {/* Sort */}
        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Sort By
          </label>

          <select
            id="sort"
            name="sort"
            defaultValue="relevance"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="relevance">
              Relevance
            </option>

            <option value="mentions">
              Mentions
            </option>

            <option value="pain">
              Pain Score
            </option>

            <option value="growth">
              Growth
            </option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default AnalysisFilters;