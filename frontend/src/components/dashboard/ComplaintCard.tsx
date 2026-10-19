
type ComplaintCardProps = {
  title: string;
  mentions: number;
  painScore: number | null;
  summary: string;
};

function ComplaintCard({
  title,
  mentions,
  painScore,
  summary,
}: ComplaintCardProps) {
  const hasPainScore =
    painScore !== null &&
    Number.isFinite(painScore) &&
    painScore >= 0 &&
    painScore <= 10;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-400">
            {summary}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
            hasPainScore
              ? "bg-red-500/10 text-red-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {hasPainScore
            ? `Pain ${painScore.toFixed(1)}/10`
            : "Pain score unavailable"}
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
