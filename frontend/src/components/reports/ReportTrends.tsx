type Trend = {
  title: string;
  description: string;
  growth: number;
  direction: "up" | "down";
};

const trends: Trend[] = [
  {
    title: "Late Delivery",
    description:
      "Mentions of delivery delays are increasing significantly across the analyzed discussions.",
    growth: 42,
    direction: "up",
  },
  {
    title: "High Delivery Fees",
    description:
      "Customers are increasingly discussing delivery costs and their impact on order decisions.",
    growth: 27,
    direction: "up",
  },
  {
    title: "Customer Support",
    description:
      "Complaints related to support responsiveness continue to increase.",
    growth: 18,
    direction: "up",
  },
];

function ReportTrends() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Emerging Trends
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Customer problems and topics showing meaningful changes in
          discussion volume.
        </p>
      </div>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {trend.title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {trend.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-xl text-green-400"
                >
                  {trend.direction === "up" ? "↑" : "↓"}
                </span>

                <span className="text-lg font-semibold text-green-400">
                  {trend.growth}%
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${Math.min(trend.growth * 2, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Change in discussion volume
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReportTrends;