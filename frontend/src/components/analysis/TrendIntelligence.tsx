import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  {
    month: "May",
    mentions: 620,
  },
  {
    month: "Jun",
    mentions: 780,
  },
  {
    month: "Jul",
    mentions: 940,
  },
  {
    month: "Aug",
    mentions: 1284,
  },
];

const trends = [
  {
    title: "Late Delivery",
    growth: 42,
    direction: "up",
  },
  {
    title: "High Delivery Fees",
    growth: 27,
    direction: "up",
  },
  {
    title: "Poor Customer Support",
    growth: 18,
    direction: "up",
  },
  {
    title: "Order Cancellation",
    growth: 11,
    direction: "up",
  },
];

function TrendIntelligence() {
  return (
    <section>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Emerging Trends
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Identify customer problems that are increasing or decreasing
          in frequency over time.
        </p>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trends.map((trend) => (
          <div
            key={trend.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
          >
            <p className="text-sm text-slate-400">
              {trend.title}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-bold text-green-400">
                ↑
              </span>

              <span className="text-2xl font-bold text-white">
                {trend.growth}%
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Growth in mentions
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">
            Complaint Mentions Over Time
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Total mentions of identified customer problems.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1E293B"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #1E293B",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                }}
              />

              <Line
                type="monotone"
                dataKey="mentions"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default TrendIntelligence;