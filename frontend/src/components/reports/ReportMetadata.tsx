type ReportMetadataProps = {
  sources: string[];
  timeRange: string;
  totalMentions: number;
  clusters: number;
};

function ReportMetadata({
  sources,
  timeRange,
  totalMentions,
  clusters,
}: ReportMetadataProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white">
        Analysis Coverage
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Sources
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {sources.map((source) => (
              <span
                key={source}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                {source}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Time Range
          </p>

          <p className="mt-2 text-sm text-white">
            {timeRange}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total Mentions
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {totalMentions.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Complaint Clusters
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {clusters}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReportMetadata;
