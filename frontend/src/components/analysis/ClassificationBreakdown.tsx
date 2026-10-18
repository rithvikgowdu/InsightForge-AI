
export type ClassificationItem = {
  label: string;
  count: number;
};

type ClassificationBreakdownProps = {
  classifications?: ClassificationItem[];
};

function ClassificationBreakdown({
  classifications = [],
}: ClassificationBreakdownProps) {
  const total = classifications.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Feedback Classification
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Classification counts returned by the analysis.
        </p>
      </div>

      {classifications.length === 0 || total === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
          <p className="text-sm text-slate-400">
            No classification data is available yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {classifications.map((item) => {
            const percentage = (item.count / total) * 100;

            return (
              <div
                key={item.label}
                className="rounded-lg bg-slate-800 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">
                      {item.label}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.count.toLocaleString()} mentions
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-white">
                    {percentage.toFixed(1)}%
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ClassificationBreakdown;
