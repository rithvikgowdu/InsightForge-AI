type OpportunityDetailsProps = {
  title: string;
  score: number;
  problem: string;
  whyNow: string;
  aiSolution: string;
  targetUsers: string;
  businessPotential: "High" | "Medium" | "Low";
  confidence: number;
  mvpFeatures: string[];
};

function OpportunityDetails({
  title,
  score,
  problem,
  whyNow,
  aiSolution,
  targetUsers,
  businessPotential,
  confidence,
  mvpFeatures,
}: OpportunityDetailsProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            AI-Generated Opportunity
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {title}
          </h2>
        </div>


        {/* Opportunity Score */}
        <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">

          <div>
            <p className="text-xs text-slate-400">
              Opportunity Score
            </p>

            <p className="mt-1 text-3xl font-bold text-white">
              {score.toFixed(1)}
              <span className="ml-1 text-sm text-slate-500">
                /10
              </span>
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500">
            <span className="text-sm font-bold text-blue-400">
              {Math.round(score * 10)}%
            </span>
          </div>

        </div>

      </div>


      {/* Problem */}
      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Problem
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {problem}
        </p>

      </div>


      {/* Why Now */}
      <div className="mt-7">

        <h3 className="text-lg font-semibold text-white">
          Why Now?
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {whyNow}
        </p>

      </div>


      {/* AI Solution */}
      <div className="mt-7">

        <h3 className="text-lg font-semibold text-white">
          AI Solution
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400">
          {aiSolution}
        </p>

      </div>


      {/* Target Users + Business Potential + Confidence */}
      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-xs text-slate-400">
            Target Users
          </p>

          <p className="mt-2 text-sm leading-6 text-white">
            {targetUsers}
          </p>

        </div>


        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-xs text-slate-400">
            Business Potential
          </p>

          <p
            className={`mt-2 text-lg font-semibold ${
              businessPotential === "High"
                ? "text-green-400"
                : businessPotential === "Medium"
                  ? "text-yellow-400"
                  : "text-slate-400"
            }`}
          >
            {businessPotential}
          </p>

        </div>


        <div className="rounded-lg bg-slate-800 p-5">

          <p className="text-xs text-slate-400">
            AI Confidence
          </p>

          <p className="mt-2 text-lg font-semibold text-blue-400">
            {confidence.toFixed(1)}/10
          </p>

        </div>

      </div>


      {/* Recommended MVP */}
      <div className="mt-8">

        <h3 className="text-lg font-semibold text-white">
          Recommended MVP
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Minimum features needed to validate this opportunity.
        </p>


        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">

          {mvpFeatures.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4"
            >

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-sm text-green-400">
                ✓
              </span>

              <span className="text-sm text-slate-300">
                {feature}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default OpportunityDetails;