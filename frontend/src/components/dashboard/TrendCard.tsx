import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TrendData = {
  month: string;
  mentions: number;
};

type TrendCardProps = {
  data: TrendData[];
};

function TrendCard({ data }: TrendCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Complaint Trend
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Number of mentions over time.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />

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
  );
}

export default TrendCard;