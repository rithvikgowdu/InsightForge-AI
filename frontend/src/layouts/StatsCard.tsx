type StatsCardProps = {
  title: string;
  value: string;
};

function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}

export default StatsCard;