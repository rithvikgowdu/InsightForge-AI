import {
  useEffect,
  useState,
} from "react";
import {
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import {
  getAnalysisHistory,
  type Analysis,
} from "../../services/api";
import LoadingSpinner from "../ui/LoadingSpinner";

function RecentSearches() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError("");

        const history = await getAnalysisHistory();

        setAnalyses(history);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load analysis history."
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  function formatTime(dateString?: string) {
    if (!dateString) {
      return "Recently";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    return date.toLocaleDateString();
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Recent Searches
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Your recently analyzed repositories.
        </p>
      </div>


      {/* Loading */}
      {loading && (
        <div className="py-6">
          <LoadingSpinner
            size="sm"
            label="Loading history..."
          />
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}


      {/* Empty */}
      {!loading &&
        !error &&
        analyses.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center">
            <p className="text-sm text-slate-400">
              No analyses yet.
            </p>
          </div>
        )}


      {/* Searches */}
      {!loading && !error && analyses.length > 0 && (
        <div className="space-y-3">

          {analyses.map((analysis) => (
            <button
              key={analysis.id}
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-4 text-left transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >

              <div className="min-w-0">

                <p className="truncate font-medium text-white">
                  {analysis.repository}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

                  <span>
                    {analysis.status}
                  </span>

                  <span>
                    •
                  </span>

                  <FiClock size={12} />

                  <span>
                    {formatTime(analysis.created_at)}
                  </span>

                </div>

              </div>


              <FiChevronRight
                size={18}
                className="shrink-0 text-slate-500"
              />

            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentSearches;