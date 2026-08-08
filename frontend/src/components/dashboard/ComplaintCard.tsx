type ComplaintCardProps = {
  title: string;
  mentions: number;
  painScore: number;
  summary: string;
};

function ComplaintCard({
  title,
  mentions,
  painScore,
  summary,
}: ComplaintCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {summary}
          </p>
        </div>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
          Pain {painScore}/10
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm text-slate-400">
          Mentions
        </span>

        <span className="font-semibold text-white">
          {mentions.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default ComplaintCard;