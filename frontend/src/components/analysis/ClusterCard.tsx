type ClusterCardProps = {
  title: string;
  mentions: number;
  painScore?: number;
  growth?: number;
  summary: string;
};

function ClusterCard({
  title,
  mentions,
  painScore,
  growth,
  summary,
}: ClusterCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-slate-700">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Complaint Cluster
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {title}
          </h3>
        </div>

        {painScore !== undefined && (
          <span className="whitespace-nowrap rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
            Pain {painScore.toFixed(1)}/10
          </span>
        )}

      </div>

      {/* Summary */}
      <p className="mt-4 text-sm leading-6 text-slate-400">
        {summary}
      </p>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Mentions
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {mentions.toLocaleString()}
          </p>
        </div>

        {growth !== undefined && (
          <div className="rounded-lg bg-slate-800 p-4">
            <p className="text-xs text-slate-400">
              Growth
            </p>

            <p className="mt-1 text-xl font-semibold text-green-400">
              +{growth}%
            </p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-800 pt-4">

        <button
          type="button"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          View complaints →
        </button>

      </div>

    </div>
  );
}

export default ClusterCard;