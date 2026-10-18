import { useEffect, useRef, useState } from "react";
import {
  getAnalysis,
  getAnalysisStatus,
  type Analysis,
  type StartAnalysisResponse,
} from "../../services/api";

type AnalysisStatusProps = {
  analysis: Analysis | StartAnalysisResponse | null;
  onCompleted?: (analysis: Analysis) => void;
};

type StatusData = {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
};

function AnalysisStatus({
  analysis,
  onCompleted,
}: AnalysisStatusProps) {
  const [currentAnalysis, setCurrentAnalysis] =
    useState<Analysis | null>(null);

  const [statusData, setStatusData] =
    useState<StatusData | null>(null);

  const [error, setError] = useState("");
   const onCompletedRef = useRef(onCompleted);

useEffect(() => {
  onCompletedRef.current = onCompleted;
}, [onCompleted]);
  /*
   * Set the initial analysis information.
   */
  useEffect(() => {
    if (!analysis) {
      setCurrentAnalysis(null);
      setStatusData(null);
      setError("");
      return;
    }

    setError("");

    setStatusData({
      id: analysis.id,
      repository: analysis.repository,
      status: analysis.status,
      total_clusters: analysis.total_clusters,
    });

    /*
     * The POST /analysis response may not contain
     * the complete results structure.
     *
     * We therefore wait for GET /analysis/{id}
     * when the analysis is completed.
     */
    setCurrentAnalysis(null);
  }, [analysis]);

  /*
   * Poll the backend while the analysis is running.
   */
  useEffect(() => {
    if (!statusData) {
      return;
    }

    if (
      statusData.status === "completed" ||
      statusData.status === "failed"
    ) {
      return;
    }

    let cancelled = false;

    async function checkStatus() {
      try {
        const updatedStatus =
          await getAnalysisStatus(statusData!.id);

        if (cancelled) {
          return;
        }

        setStatusData({
          id: updatedStatus.id,
          repository: updatedStatus.repository,
          status: updatedStatus.status,
          total_clusters:
            updatedStatus.total_clusters,
        });

        /*
         * Once completed, fetch the complete analysis
         * including the cluster results.
         */
        if (updatedStatus.status === "completed") {
          const completedAnalysis =
            await getAnalysis(updatedStatus.id);

          if (cancelled) {
            return;
          }

          setCurrentAnalysis(completedAnalysis);

          onCompletedRef.current?.(completedAnalysis);
        }

        if (updatedStatus.status === "failed") {
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

    /*
     * Check immediately.
     */
    checkStatus();

    /*
     * Then check every 3 seconds.
     */
    const interval = window.setInterval(
      checkStatus,
      3000
    );

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [
  statusData?.id,
  statusData?.status,
]);
  if (!statusData) {
    return null;
  }

  const status = statusData.status;

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

  const clusters =
    currentAnalysis?.results?.clusters ?? [];

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
            {statusData.repository}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Analysis ID: {statusData.id}
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

      {/* Status Message */}
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
              {statusData.total_clusters}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Results
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {clusters.length}
            </p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {status === "completed" &&
        clusters.length > 0 && (
          <div className="mt-6">
            <h3 className="text-base font-semibold text-white">
              Analysis Results
            </h3>

            <div className="mt-4 space-y-3">
              {clusters.map((result) => (
                <div
                  key={result.cluster}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-semibold text-white">
                      Cluster {result.cluster}
                    </h4>

                    <span className="text-xs text-slate-500">
                      {result.documents} documents
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                    {result.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* No Results */}
      {status === "completed" &&
        clusters.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              The analysis completed, but no cluster
              results were returned.
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