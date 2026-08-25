type OpportunityScoreCardProps = {
  score: number;
  pain: number;
  frequency: number;
  growth: number;
  marketPotential: number;
  aiFit: number;
  confidence: number;
};

function OpportunityScoreCard({
  score,
  pain,
  frequency,
  growth,
  marketPotential,
  aiFit,
  confidence,
}: OpportunityScoreCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            Opportunity Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-white">
            {score.toFixed(1)}
            <span className="ml-1 text-lg text-slate-500">
              /10
            </span>
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Overall business opportunity potential.
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-500">
          <span className="text-lg font-bold text-blue-400">
            {Math.round(score * 10)}%
          </span>
        </div>

      </div>


      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Pain
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {pain.toFixed(1)}/10
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Frequency
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {frequency.toFixed(1)}/10
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Growth
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {growth.toFixed(1)}/10
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Market Potential
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {marketPotential.toFixed(1)}/10
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            AI Fit
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {aiFit.toFixed(1)}/10
          </p>
        </div>


        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            Confidence
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {confidence.toFixed(1)}/10
          </p>
        </div>

      </div>

    </div>
  );
}

export default OpportunityScoreCard;