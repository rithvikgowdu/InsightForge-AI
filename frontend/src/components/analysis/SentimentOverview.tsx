type SentimentOverviewProps = {
  negative: number;
  neutral: number;
  positive: number;
};

function SentimentOverview({
  negative,
  neutral,
  positive,
}: SentimentOverviewProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Sentiment Overview
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Overall sentiment detected across the analyzed discussions.
        </p>
      </div>


      {/* Sentiment bars */}
      <div className="mt-6 space-y-5">

        {/* Negative */}
        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-300">
              Negative
            </span>

            <span className="text-sm font-semibold text-red-400">
              {negative}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-red-500"
              style={{ width: `${negative}%` }}
            />
          </div>

        </div>


        {/* Neutral */}
        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-300">
              Neutral
            </span>

            <span className="text-sm font-semibold text-slate-300">
              {neutral}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-slate-500"
              style={{ width: `${neutral}%` }}
            />
          </div>

        </div>


        {/* Positive */}
        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-300">
              Positive
            </span>

            <span className="text-sm font-semibold text-green-400">
              {positive}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${positive}%` }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default SentimentOverview;