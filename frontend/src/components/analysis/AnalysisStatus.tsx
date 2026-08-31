import { useEffect, useState } from "react";
import {
  getAnalysisStatus,
  type Analysis,
} from "../../services/api";

type AnalysisStatusProps = {
  analysis: Analysis | null;
  onCompleted?: (analysis: Analysis) => void;
};

function AnalysisStatus({
  analysis,
  onCompleted,
}: AnalysisStatusProps) {
  const [currentAnalysis, setCurrentAnalysis] =
    useState<Analysis | null>(analysis);

  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentAnalysis(analysis);
    setError("");
  }, [analysis]);

  useEffect(() => {
    if (!currentAnalysis) {
      return;
    }

    if (
      currentAnalysis.status === "completed" ||
      currentAnalysis.status === "failed"
    ) {
      return;
    }

    let cancelled = false;

    async function checkStatus() {
      try {
        const updatedAnalysis = await getAnalysisStatus(
          currentAnalysis!.id
        );

        if (cancelled) {
          return;
        }

        setCurrentAnalysis(updatedAnalysis);

        if (updatedAnalysis.status === "completed") {
          onCompleted?.(updatedAnalysis);
        }

        if (updatedAnalysis.status === "failed") {
          setError(
            "The analysis failed. Please try again."
          );
        }
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to check analysis status."
        );
      }
    }

    const interval = window.setInterval(
      checkStatus,
      3000
    );

    checkStatus();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [
    currentAnalysis?.id,
    currentAnalysis?.status,
    onCompleted,
  ]);

  if (!currentAnalysis) {
    return null;
  }

  const status = currentAnalysis.status;

  const statusMessage =
    status === "pending"
      ? "Analysis is waiting to start..."
      : status === "running"
      ? "Analysis is currently running..."
      : status === "completed"
      ? "Analysis completed successfully."
      : status === "failed"
      ? "Analysis failed."
      : "Checking analysis status...";

  return (
    <section
      aria-labelledby="analysis-status-title"
      aria-live="polite"
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">
            Repository
          </p>

          <h2
            id="analysis-status-title"
            className="mt-1 text-lg font-semibold text-white"
          >
            {currentAnalysis.repository}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Analysis ID: {currentAnalysis.id}
          </p>
        </div>

        <span
          className={`
            w-fit rounded-full px-3 py-1 text-xs font-medium
            ${
              status === "completed"
                ? "bg-green-500/10 text-green-400"
                : status === "failed"
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }
          `}
        >
          {status}
        </span>
      </div>

      {/* Status */}
      <p className="mt-5 text-sm text-slate-400">
        {statusMessage}
      </p>

      {/* Progress */}
      {status !== "completed" &&
        status !== "failed" && (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-500" />
          </div>
        )}

      {/* Completed Summary */}
      {status === "completed" && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Complaint Clusters
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {currentAnalysis.total_clusters}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Results
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {currentAnalysis.results?.length ?? 0}
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {status === "completed" &&
        currentAnalysis.results &&
        currentAnalysis.results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-base font-semibold text-white">
              Analysis Results
            </h3>

            <div className="mt-4 space-y-3">
              {currentAnalysis.results.map(
                (result, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                  >
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-5 text-slate-300">
                      {JSON.stringify(
                        result,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* No Results */}
      {status === "completed" &&
        (!currentAnalysis.results ||
          currentAnalysis.results.length === 0) && (
          <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              The analysis completed, but no result
              records were returned.
            </p>
          </div>
        )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}
    </section>
  );
}

export default AnalysisStatus;