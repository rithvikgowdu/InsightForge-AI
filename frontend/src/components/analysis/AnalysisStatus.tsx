
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
   * Initialize the selected analysis.
   * If it is already completed, fetch its saved results.
   */
  useEffect(() => {
    let cancelled = false;

    if (!analysis) {
      setCurrentAnalysis(null);
      setStatusData(null);
      setError("");

      return () => {
        cancelled = true;
      };
    }

    setError("");
    setCurrentAnalysis(null);

    setStatusData({
      id: analysis.id,
      repository: analysis.repository,
      status: analysis.status,
      total_clusters: analysis.total_clusters,
    });

    if (analysis.status === "completed") {
      getAnalysis(analysis.id)
        .then((completedAnalysis) => {
          if (cancelled) return;

          setCurrentAnalysis(completedAnalysis);
          setStatusData({
            id: completedAnalysis.id,
            repository: completedAnalysis.repository,
            status: completedAnalysis.status,
            total_clusters: completedAnalysis.total_clusters,
          });

          onCompletedRef.current?.(completedAnalysis);
        })
        .catch((err: unknown) => {
          if (cancelled) return;

          setError(
            err instanceof Error
              ? err.message
              : "Unable to load completed analysis results."
          );
        });
    }

    return () => {
      cancelled = true;
    };
  }, [analysis?.id, analysis?.status]);

  /*
   * Poll while the analysis is pending or running.
   */
  useEffect(() => {
    if (!statusData) return;

    if (
      statusData.status === "completed" ||
      statusData.status === "failed"
    ) {
      return;
    }

    let cancelled = false;
    let checking = false;

    async function checkStatus() {
      if (checking) return;
      checking = true;

      try {
        const updatedStatus = await getAnalysisStatus(
          statusData!.id
        );

        if (cancelled) return;

        setStatusData({
          id: updatedStatus.id,
          repository: updatedStatus.repository,
          status: updatedStatus.status,
          total_clusters: updatedStatus.total_clusters,
        });

        if (updatedStatus.status === "completed") {
          const completedAnalysis = await getAnalysis(
            updatedStatus.id
          );

          if (cancelled) return;

          setCurrentAnalysis(completedAnalysis);
          onCompletedRef.current?.(completedAnalysis);
        }

        if (updatedStatus.status === "failed") {
          setError("The analysis failed. Please try again.");
        }
      } catch (err: unknown) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to check analysis status."
        );
      } finally {
        checking = false;
      }
    }

    void checkStatus();

    const interval = window.setInterval(() => {
      void checkStatus();
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [statusData?.id, statusData?.status]);

  if (!statusData) return null;

  const status = statusData.status;

  const statusMessage =
    status === "pending"
      ? "Analysis is waiting to start..."
      : status === "running" || status === "processing"
      ? "Analysis is currently running..."
      : status === "completed"
      ? "Analysis completed successfully."
      : status === "failed"
      ? "Analysis failed."
      : "Checking analysis status...";

  const clusters = currentAnalysis?.results?.clusters ?? [];

  return (
    <section
      aria-labelledby="analysis-status-title"
      aria-live="polite"
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
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

      <p className="mt-5 text-sm text-slate-400">
        {statusMessage}
      </p>

      {status !== "completed" && status !== "failed" && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-500" />
        </div>
      )}

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

      {status === "completed" && clusters.length > 0 && (
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

                {result.opportunity && (
                  <div className="mt-4 border-t border-slate-800 pt-4">
                    <h5 className="font-medium text-blue-400">
                      Product Opportunity
                    </h5>

                    {typeof result.opportunity.problem_statement === "string" && (
                      <p className="mt-2 text-sm text-slate-300">
                        <strong>Problem:</strong>{" "}
                        {result.opportunity.problem_statement}
                      </p>
                    )}

                    {typeof result.opportunity.business_opportunity === "string" && (
                      <p className="mt-2 text-sm text-slate-300">
                        <strong>Business opportunity:</strong>{" "}
                        {result.opportunity.business_opportunity}
                      </p>
                    )}

                    {typeof result.opportunity.ai_solution === "string" && (
                      <p className="mt-2 text-sm text-slate-300">
                        <strong>AI solution:</strong>{" "}
                        {result.opportunity.ai_solution}
                      </p>
                    )}

                    {Array.isArray(result.opportunity.mvp_features) && (
                      <ul className="mt-2 list-inside list-disc text-sm text-slate-400">
                        {result.opportunity.mvp_features
                          .filter(
                            (feature): feature is string =>
                              typeof feature === "string"
                          )
                          .map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "completed" &&
        clusters.length === 0 &&
        !error && (
          <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              Loading saved cluster results, or no cluster results
              are available.
            </p>
          </div>
        )}

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
