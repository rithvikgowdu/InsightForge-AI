type ExecutiveSummaryProps = {
  summary: string;
};

function ExecutiveSummary({
  summary,
}: ExecutiveSummaryProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <div className="mb-4">
        <p className="text-sm font-medium text-blue-400">
          Executive Summary
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          What the analysis found
        </h2>
      </div>

      <p className="max-w-4xl text-sm leading-7 text-slate-400">
        {summary}
      </p>

    </section>
  );
}

export default ExecutiveSummary;