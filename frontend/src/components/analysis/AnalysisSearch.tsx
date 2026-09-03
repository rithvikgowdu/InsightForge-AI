import { useState } from "react";
import { FiGithub, FiSearch } from "react-icons/fi";

type AnalysisSearchProps = {
  onSearch?: (
    owner: string,
    repository: string,
    limit: number
  ) => void;
  loading?: boolean;
};

function AnalysisSearch({
  onSearch,
  loading = false,
}: AnalysisSearchProps) {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [limit, setLimit] = useState("20");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedOwner = owner.trim();
    const trimmedRepository = repository.trim();
    const parsedLimit = Number(limit);

    if (
      !trimmedOwner ||
      !trimmedRepository ||
      !parsedLimit ||
      parsedLimit < 1 ||
      loading
    ) {
      return;
    }

    onSearch?.(
      trimmedOwner,
      trimmedRepository,
      parsedLimit
    );
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Discover Product Opportunities
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Analyze a GitHub repository to uncover customer
          problems, feature requests, emerging trends, and
          business opportunities.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Owner */}
          <div>
            <label
              htmlFor="github-owner"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              GitHub Owner
            </label>

            <div className="relative">
              <FiGithub
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="github-owner"
                type="text"
                value={owner}
                onChange={(event) =>
                  setOwner(event.target.value)
                }
                placeholder="e.g. microsoft"
                disabled={loading}
                autoComplete="off"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* Repository */}
          <div>
            <label
              htmlFor="github-repository"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              GitHub Repository
            </label>

            <div className="relative">
              <FiSearch
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="github-repository"
                type="text"
                value={repository}
                onChange={(event) =>
                  setRepository(event.target.value)
                }
                placeholder="e.g. vscode"
                disabled={loading}
                autoComplete="off"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Limit + Analyze */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="w-full sm:w-40">
            <label
              htmlFor="analysis-limit"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Discussion Limit
            </label>

            <input
              id="analysis-limit"
              type="number"
              min="1"
              value={limit}
              onChange={(event) =>
                setLimit(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !owner.trim() ||
              !repository.trim() ||
              !Number(limit) ||
              Number(limit) < 1
            }
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnalysisSearch;