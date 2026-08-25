import ClusterCard from "./ClusterCard";

const clusters = [
  {
    title: "Late Delivery",
    mentions: 1284,
    painScore: 8.7,
    growth: 42,
    summary:
      "Users frequently report delayed deliveries and inaccurate delivery estimates.",
  },
  {
    title: "High Delivery Fees",
    mentions: 932,
    painScore: 7.9,
    growth: 27,
    summary:
      "Customers complain that delivery charges are too expensive, especially for smaller orders.",
  },
  {
    title: "Poor Customer Support",
    mentions: 741,
    painScore: 7.6,
    growth: 18,
    summary:
      "Users report difficulty reaching support and resolving delivery-related problems.",
  },
  {
    title: "Order Cancellation",
    mentions: 516,
    painScore: 7.2,
    growth: 11,
    summary:
      "Customers frequently discuss unexpected cancellations and limited explanations.",
  },
];

function ComplaintClusters() {
  return (
    <section>

      {/* Section Header */}
      <div className="mb-5">

        <h2 className="text-2xl font-semibold text-white">
          Complaint Clusters
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Recurring customer problems identified by the AI clustering
          system.
        </p>

      </div>


      {/* Cluster Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {clusters.map((cluster) => (
          <ClusterCard
            key={cluster.title}
            title={cluster.title}
            mentions={cluster.mentions}
            painScore={cluster.painScore}
            growth={cluster.growth}
            summary={cluster.summary}
          />
        ))}

      </div>

    </section>
  );
}

export default ComplaintClusters;