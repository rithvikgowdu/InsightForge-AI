type PainScoreCardProps = {
  score: number;
};

function PainScoreCard({ score }: PainScoreCardProps) {
  const percentage = Math.min(Math.max(score * 10, 0), 100);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Pain Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-white">
            {score.toFixed(1)}
            <span className="ml-1 text-lg font-medium text-slate-500">
              /10
            </span>
          </h3>
        </div>

        <div className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400">
          High Pain
        </div>
      </div>

      <div className="mt-6">
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-red-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        Higher scores indicate stronger and more frequent user pain.
      </p>
    </div>
  );
}

export default PainScoreCard;