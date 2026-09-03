import ClusterCard from "./ClusterCard";
import type { AnalysisResult } from "../../services/api";

type ComplaintClustersProps = {
  results?: AnalysisResult[];
};

function ComplaintClusters({
  results = [],
}: ComplaintClustersProps) {
  const clusters = results
    .filter(
      (result) =>
        result.cluster !== undefined &&
        result.documents !== undefined &&
        result.summary !== undefined
    )
    .map((result) => ({
      title: `Cluster ${String(result.cluster)}`,
      mentions: Number(result.documents) || 0,
      summary: String(result.summary),
    }));

  return (
    <section>
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Complaint Clusters
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Recurring customer problems identified by the AI
          clustering system.
        </p>
      </div>

      {/* Empty State */}
      {clusters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No complaint clusters are available yet.
          </p>
        </div>
      ) : (
        /* Cluster Grid */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {clusters.map((cluster) => (
            <ClusterCard
              key={cluster.title}
              title={cluster.title}
              mentions={cluster.mentions}
              summary={cluster.summary}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ComplaintClusters;