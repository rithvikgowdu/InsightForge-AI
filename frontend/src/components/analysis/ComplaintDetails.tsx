type ComplaintDetailsProps = {
  title: string;
  painScore: number;
  mentions: number;
  growth: number;
  summary: string;
  themes: string[];
  complaints: string[];
};

function ComplaintDetails({
  title,
  painScore,
  mentions,
  growth,
  summary,
  themes,
  complaints,
}: ComplaintDetailsProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Complaint Details
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
          Pain {painScore.toFixed(1)}/10
        </span>

      </div>


      {/* Metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Mentions
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {mentions.toLocaleString()}
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Pain Score
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {painScore.toFixed(1)}
            <span className="ml-1 text-sm text-slate-500">
              /10
            </span>
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Growth
          </p>

          <p className="mt-1 text-2xl font-bold text-green-400">
            +{growth}%
          </p>
        </div>

      </div>


      {/* Summary */}
      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Summary
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {summary}
        </p>

      </div>


      {/* Common Themes */}
      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Common Themes
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">

          {themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300"
            >
              {theme}
            </span>
          ))}

        </div>

      </div>


      {/* Representative Complaints */}
      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Representative Complaints
        </h3>

        <div className="mt-4 space-y-3">

          {complaints.map((complaint, index) => (
            <div
              key={`${complaint}-${index}`}
              className="rounded-lg border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-sm leading-6 text-slate-300">
                "{complaint}"
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;