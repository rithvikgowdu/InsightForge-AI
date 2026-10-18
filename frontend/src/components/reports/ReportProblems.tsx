
import type { AnalysisResult } from "../../services/api";

type ReportProblemsProps = {
  results?: AnalysisResult[];
};

function ReportProblems({ results = [] }: ReportProblemsProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Top Customer Problems
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Complaint clusters identified by the repository analysis.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No complaint clusters are available for this report.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead className="border-b border-slate-800 bg-slate-950">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Complaint Cluster
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Documents
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Summary
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => (
                  <tr
                    key={result.cluster}
                    className="border-b border-slate-800 last:border-b-0"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      Cluster {result.cluster}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {result.documents.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm leading-6 text-slate-400">
                      {result.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReportProblems;
