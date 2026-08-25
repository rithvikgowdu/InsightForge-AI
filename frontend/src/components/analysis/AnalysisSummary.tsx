type AnalysisSummaryProps = {
  industry: string;
  totalMentions: number;
  complaintClusters: number;
  featureRequests: number;
  opportunities: number;
};

function AnalysisSummary({
  industry,
  totalMentions,
  complaintClusters,
  featureRequests,
  opportunities,
}: AnalysisSummaryProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm text-slate-400">
            Analysis Summary
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            {industry}
          </h2>
        </div>

        <span className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
          Analysis Complete
        </span>

      </div>


      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Mentions */}
        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-sm text-slate-400">
            Total Mentions
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalMentions.toLocaleString()}
          </p>

        </div>


        {/* Complaint Clusters */}
        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-sm text-slate-400">
            Complaint Clusters
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {complaintClusters}
          </p>

        </div>


        {/* Feature Requests */}
        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-sm text-slate-400">
            Feature Requests
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {featureRequests}
          </p>

        </div>


        {/* Opportunities */}
        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-sm text-slate-400">
            Opportunities
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {opportunities}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AnalysisSummary;