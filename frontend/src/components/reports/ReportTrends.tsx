
import type { AnalysisResult } from "../../services/api";

type ReportTrendsProps = {
  results?: AnalysisResult[];
};

function ReportTrends({ results = [] }: ReportTrendsProps) {
  const trends = results.filter(
    (result) =>
      typeof result.summary === "string" &&
      result.summary.trim().length > 0
  );

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Emerging Trends
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Recurring problem areas identified in the analyzed discussions.
          These are cluster summaries, not measured changes over time.
        </p>
      </div>

      {trends.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm leading-6 text-slate-400">
            No trend data is available yet. Complete a repository analysis
            to see the identified problem areas here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {trends.map((trend) => (
            <div
              key={trend.cluster}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Problem Cluster {trend.cluster}
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    {trend.summary}
                  </p>
                </div>

                <div className="shrink-0 rounded-lg bg-slate-800 px-3 py-2">
                  <p className="text-lg font-semibold text-white">
                    {trend.documents}
                  </p>
                  <p className="text-xs text-slate-400">
                    Discussions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReportTrends;
