
import type { AnalysisResult } from "../../services/api";

type KeyFindingsProps = {
  results?: AnalysisResult[];
};

function KeyFindings({ results = [] }: KeyFindingsProps) {
  const findings = results
    .filter(
      (result) =>
        typeof result.summary === "string" &&
        result.summary.trim().length > 0
    )
    .sort((a, b) => b.documents - a.documents);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Key Findings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          The largest discussion clusters identified by the analysis,
          ordered by the number of associated documents.
        </p>
      </div>

      {findings.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm leading-6 text-slate-400">
            No key findings are available yet. Complete a repository
            analysis to display its cluster summaries here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {findings.map((finding, index) => (
            <div
              key={finding.cluster}
              className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">
                  Cluster {finding.cluster}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {finding.summary}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  {finding.documents.toLocaleString()} associated
                  discussions
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default KeyFindings;
