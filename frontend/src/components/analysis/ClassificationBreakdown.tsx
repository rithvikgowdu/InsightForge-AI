type Classification = {
  label: string;
  percentage: number;
  count: number;
};

const classifications: Classification[] = [
  {
    label: "Complaints",
    percentage: 52,
    count: 668,
  },
  {
    label: "Feature Requests",
    percentage: 28,
    count: 360,
  },
  {
    label: "Improvements",
    percentage: 12,
    count: 154,
  },
  {
    label: "Other",
    percentage: 8,
    count: 102,
  },
];

function ClassificationBreakdown() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Feedback Classification
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          How the analyzed discussions are categorized by the AI.
        </p>
      </div>


      {/* Classification list */}
      <div className="mt-6 space-y-4">

        {classifications.map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-slate-800 p-4"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="font-medium text-white">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.count.toLocaleString()} mentions
                </p>
              </div>

              <p className="text-lg font-semibold text-white">
                {item.percentage}%
              </p>

            </div>


            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${item.percentage}%` }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ClassificationBreakdown;