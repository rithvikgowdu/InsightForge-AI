type Problem = {
  title: string;
  mentions: number;
  painScore: number;
  growth: number;
};

const problems: Problem[] = [
  {
    title: "Late Delivery",
    mentions: 1284,
    painScore: 8.7,
    growth: 42,
  },
  {
    title: "High Delivery Fees",
    mentions: 932,
    painScore: 7.9,
    growth: 27,
  },
  {
    title: "Poor Customer Support",
    mentions: 741,
    painScore: 7.6,
    growth: 18,
  },
];

function ReportProblems() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Top Customer Problems
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          The highest-impact problems identified in the analysis.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">

            <thead className="border-b border-slate-800 bg-slate-950">
              <tr>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Problem
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Mentions
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Pain Score
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Growth
                </th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem.title}
                  className="border-b border-slate-800 last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {problem.title}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-400">
                    {problem.mentions.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-red-400">
                    {problem.painScore.toFixed(1)}/10
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-green-400">
                    +{problem.growth}%
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}

export default ReportProblems;