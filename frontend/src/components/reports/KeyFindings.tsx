type Finding = {
  title: string;
  description: string;
};

const findings: Finding[] = [
  {
    title: "Delivery delays are the dominant customer pain point",
    description:
      "Late delivery complaints represent the largest identified complaint cluster and have shown significant growth.",
  },
  {
    title: "Customers want greater delivery visibility",
    description:
      "A significant number of feature requests focus on accurate ETAs, real-time tracking, and delivery notifications.",
  },
  {
    title: "Customer support remains a recurring issue",
    description:
      "Users repeatedly report difficulty reaching support and resolving delivery-related problems.",
  },
];

function KeyFindings() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Key Findings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          The most important insights identified by the analysis.
        </p>
      </div>

      <div className="space-y-4">
        {findings.map((finding, index) => (
          <div
            key={finding.title}
            className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
              {index + 1}
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {finding.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {finding.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KeyFindings;