
import ClusterCard from "./ClusterCard";
import type { AnalysisResult } from "../../services/api";

type ComplaintClustersProps = {
  results?: AnalysisResult[];
};

function ComplaintClusters({
  results = [],
}: ComplaintClustersProps) {
  if (results.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Complaint Clusters
        </h2>
        <p className="text-sm text-slate-400">
          No complaint clusters are available for this analysis yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">
        Complaint Clusters
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {results.map((result) => (
          <ClusterCard
            key={result.cluster}
            title={`Cluster ${result.cluster + 1}`}
            mentions={result.documents}
            summary={result.summary}
            painScore={
              typeof result.pain_score === "number" &&
              Number.isFinite(result.pain_score)
                ? result.pain_score
                : undefined
            }
            growth={
              typeof result.growth === "number" &&
              Number.isFinite(result.growth)
                ? result.growth
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

export default ComplaintClusters;
