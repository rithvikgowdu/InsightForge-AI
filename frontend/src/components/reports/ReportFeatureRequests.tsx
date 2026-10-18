
import type { AnalysisResult } from "../../services/api";

type ReportFeatureRequestsProps = {
  results?: AnalysisResult[];
};

function ReportFeatureRequests({
  results = [],
}: ReportFeatureRequestsProps) {
  const featureRequests = results.flatMap((result) => {
    const opportunity = result.opportunity;

    if (!opportunity || typeof opportunity !== "object") {
      return [];
    }

    const data = opportunity as Record<string, unknown>;

    const features =
      data.featureRequests ??
      data.feature_requests ??
      data.features ??
      data.mvpFeatures ??
      data.mvp_features;

    if (!Array.isArray(features)) {
      return [];
    }

    return features
      .filter((feature): feature is string => typeof feature === "string")
      .map((feature, index) => ({
        title: feature,
        cluster: result.cluster,
        mentions: result.documents,
        key: `${result.cluster}-${index}`,
      }));
  });

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
          Feature suggestions returned by the repository analysis.
          Mentions show the size of the associated discussion cluster,
          not a verified count for each individual feature.
        </p>
      </div>

      {featureRequests.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm leading-6 text-slate-400">
            No feature requests are available in this analysis yet.
            Feature requests will appear here when the backend returns them.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[500px] text-left"
              aria-label="Analysis feature requests"
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
                    Cluster
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500"
                  >
                    Cluster discussions
                  </th>
                </tr>
              </thead>

              <tbody>
                {featureRequests.map((request) => (
                  <tr
                    key={request.key}
                    className="border-b border-slate-800 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white"
                    >
                      {request.title}
                    </th>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {request.cluster}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {request.mentions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReportFeatureRequests;
