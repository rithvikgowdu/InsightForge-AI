
type SentimentOverviewProps = {
  negative?: number;
  neutral?: number;
  positive?: number;
};

function SentimentOverview({
  negative,
  neutral,
  positive,
}: SentimentOverviewProps) {
  const hasData =
    negative !== undefined &&
    neutral !== undefined &&
    positive !== undefined;

  const values = [
    {
      label: "Negative",
      value: negative,
      textColor: "text-red-400",
      barColor: "bg-red-500",
    },
    {
      label: "Neutral",
      value: neutral,
      textColor: "text-slate-300",
      barColor: "bg-slate-500",
    },
    {
      label: "Positive",
      value: positive,
      textColor: "text-green-400",
      barColor: "bg-green-500",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Sentiment Overview
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Overall sentiment detected across the analyzed discussions.
        </p>
      </div>

      {!hasData ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
          <p className="text-sm text-slate-400">
            Sentiment data is not available yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {values.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  {item.label}
                </span>

                <span className={`text-sm font-semibold ${item.textColor}`}>
                  {item.value}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${item.barColor}`}
                  style={{
                    width: `${Math.max(0, Math.min(100, item.value!))}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SentimentOverview;
