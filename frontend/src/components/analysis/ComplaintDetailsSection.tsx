
import ComplaintDetails from "./ComplaintDetails";
import type { AnalysisResult } from "../../services/api";

type ComplaintDetailsSectionProps = {
  results?: AnalysisResult[];
};

function ComplaintDetailsSection({
  results = [],
}: ComplaintDetailsSectionProps) {
  const complaints = results.filter(
    (result) =>
      typeof result.summary === "string" &&
      result.summary.trim().length > 0
  );

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Complaint Details
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Explore the problem summaries identified by the repository analysis.
        </p>
      </div>

      {complaints.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No complaint details are available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((result) => (
            <ComplaintDetails
              key={result.cluster}
              title={`Complaint Cluster ${result.cluster}`}
              painScore={0}
              mentions={result.documents}
              growth={0}
              summary={result.summary}
              themes={[]}
              complaints={[]}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ComplaintDetailsSection;
