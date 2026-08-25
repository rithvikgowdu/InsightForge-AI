type Opportunity = {
  title: string;
  score: number;
  description: string;
  mvp: string;
};

const opportunities: Opportunity[] = [
  {
    title: "AI Delivery Optimization Platform",
    score: 8.6,
    description:
      "Predict delivery delays and provide more accurate estimated arrival times using historical and real-time signals.",
    mvp:
      "Delay prediction, real-time ETA, and customer notifications.",
  },
  {
    title: "Smart Delivery Support Assistant",
    score: 7.9,
    description:
      "Use AI to help customers resolve common delivery problems without waiting for human support.",
    mvp:
      "AI support assistant with order-status and issue-resolution workflows.",
  },
];

function ReportOpportunities() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Product Opportunities
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Business opportunities generated from customer pain and demand.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">

              <h3 className="text-lg font-semibold text-white">
                {opportunity.title}
              </h3>

              <span className="whitespace-nowrap rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                {opportunity.score.toFixed(1)}/10
              </span>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {opportunity.description}
            </p>

            <div className="mt-5 border-t border-slate-800 pt-5">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Recommended MVP
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {opportunity.mvp}
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReportOpportunities;