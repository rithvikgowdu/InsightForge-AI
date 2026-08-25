type MVPFeature = {
  title: string;
  description: string;
};

const mvpFeatures: MVPFeature[] = [
  {
    title: "Delivery Delay Prediction",
    description:
      "Predict whether an order is likely to arrive later than the estimated delivery time.",
  },
  {
    title: "Real-Time ETA",
    description:
      "Continuously update the expected arrival time using available delivery signals.",
  },
  {
    title: "Customer Notifications",
    description:
      "Notify customers when an order is likely to be delayed.",
  },
  {
    title: "Delivery Performance Dashboard",
    description:
      "Give operations teams visibility into predicted and actual delivery performance.",
  },
];

function RecommendedMVP() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Recommended MVP
        </h2>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
          A focused starting point for validating the highest-scoring
          opportunity identified by the analysis.
        </p>
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-slate-900 p-6 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Recommended Product
            </p>

            <h3 className="mt-1 text-xl font-semibold text-white">
              AI Delivery Optimization Platform
            </h3>
          </div>

          <span className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
            High Potential
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {mvpFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-lg border border-slate-800 bg-slate-950 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                  {index + 1}
                </span>

                <div>
                  <h4 className="font-medium text-white">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedMVP;