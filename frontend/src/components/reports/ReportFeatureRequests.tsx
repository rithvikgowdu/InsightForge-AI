type FeatureRequest = {
  title: string;
  mentions: number;
  priority: "High" | "Medium" | "Low";
  growth: number;
};

const featureRequests: FeatureRequest[] = [
  {
    title: "Real-Time Delivery Tracking",
    mentions: 734,
    priority: "High",
    growth: 38,
  },
  {
    title: "Scheduled Delivery",
    mentions: 521,
    priority: "High",
    growth: 24,
  },
  {
    title: "Better Customer Support",
    mentions: 403,
    priority: "Medium",
    growth: 16,
  },
];

function ReportFeatureRequests() {
  return (
    <section aria-labelledby="feature-requests-title">

      <div className="mb-5">
        <h2
          id="feature-requests-title"
          className="text-2xl font-semibold text-white"
        >
          Feature Requests
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Features and improvements with the strongest evidence of
          customer demand.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

        <div className="overflow-x-auto">
          <table
            className="w-full min-w-[650px] text-left"
            aria-label="Customer feature requests"
          >
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500"
                >
                  Feature
                </th>

                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500"
                >
                  Mentions
                </th>

                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500"
                >
                  Priority
                </th>

                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500"
                >
                  Growth
                </th>
              </tr>
            </thead>

            <tbody>
              {featureRequests.map((request) => (
                <tr
                  key={request.title}
                  className="border-b border-slate-800 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white"
                  >
                    {request.title}
                  </th>

                  <td className="px-6 py-4 text-sm text-slate-400">
                    {request.mentions.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        request.priority === "High"
                          ? "bg-red-500/10 text-red-400"
                          : request.priority === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-green-400">
                    +{request.growth}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

export default ReportFeatureRequests;