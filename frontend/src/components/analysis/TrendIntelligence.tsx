
import type { AnalysisResult } from "../../services/api";

type TrendIntelligenceProps = {
  results?: AnalysisResult[];
};

function TrendIntelligence({
  results = [],
}: TrendIntelligenceProps) {
  const trends = results
    .filter(
      (result) =>
        typeof result.summary === "string" &&
        result.summary.trim().length > 0
    )
    .map((result) => ({
      id: result.cluster,
      title: `Complaint Cluster ${result.cluster}`,
      summary: result.summary,
      mentions: result.documents,
    }));

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Emerging Trends
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Recurring problem areas identified in the repository analysis.
          Historical growth trends require time-series data.
        </p>
      </div>

      {trends.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No trend data is available yet. Complete an analysis to
            display identified problem areas.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-sm text-slate-400">
                  {trend.title}
                </p>

                <p className="mt-3 text-2xl font-bold text-white">
                  {trend.mentions.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Documents in this cluster
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {trend.summary}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            These are recurring problem areas, not measured growth
            trends. Percentage growth and historical charts will require
            dated observations across multiple time periods.
          </p>
        </>
      )}
    </section>
  );
}

export default TrendIntelligence;
