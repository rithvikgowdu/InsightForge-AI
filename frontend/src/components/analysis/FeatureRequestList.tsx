type FeatureRequest = {
  title: string;
  description: string;
  mentions: number;
  growth: number;
  priority: "High" | "Medium" | "Low";
  type: "Feature Request" | "Improvement";
};

const featureRequests: FeatureRequest[] = [
  {
    title: "Real-Time Delivery Tracking",
    description:
      "Users want accurate real-time information about their delivery status and expected arrival time.",
    mentions: 734,
    growth: 38,
    priority: "High",
    type: "Feature Request",
  },
  {
    title: "Scheduled Delivery",
    description:
      "Customers want the ability to select a preferred delivery time when placing an order.",
    mentions: 521,
    growth: 24,
    priority: "High",
    type: "Feature Request",
  },
  {
    title: "Better Customer Support",
    description:
      "Users want faster access to support and better resolution of delivery-related issues.",
    mentions: 403,
    growth: 16,
    priority: "Medium",
    type: "Improvement",
  },
];

function FeatureRequestList() {
  return (
    <section>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Feature Requests
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Features and improvements repeatedly requested by users.
        </p>
      </div>

      {/* Requests */}
      <div className="space-y-4">
        {featureRequests.map((request) => (
          <div
            key={request.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-slate-700"
          >
            {/* Top */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {request.title}
                  </h3>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {request.type}
                  </span>
                </div>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {request.description}
                </p>
              </div>

              {/* Priority */}
              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                  request.priority === "High"
                    ? "bg-red-500/10 text-red-400"
                    : request.priority === "Medium"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-slate-800 text-slate-400"
                }`}
              >
                {request.priority} Priority
              </span>
            </div>

            {/* Metrics */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  Mentions
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {request.mentions.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  Demand Growth
                </p>

                <p className="mt-1 text-xl font-semibold text-green-400">
                  +{request.growth}%
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  Demand Level
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {request.priority === "High"
                    ? "Very High"
                    : request.priority === "Medium"
                      ? "Moderate"
                      : "Low"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureRequestList;