
import type { AnalysisResult } from "../../services/api";

type FeatureRequestListProps = {
  results?: AnalysisResult[];
};

function FeatureRequestList({
  results = [],
}: FeatureRequestListProps) {
  const featureRequests = results.flatMap((result) => {
    const opportunity = result.opportunity;

    if (!opportunity || typeof opportunity !== "object") {
      return [];
    }

    const data = opportunity as Record<string, unknown>;

    const rawRequests =
      data.featureRequests ??
      data.feature_requests ??
      data.features ??
      data.mvpFeatures ??
      data.mvp_features;

    if (!Array.isArray(rawRequests)) {
      return [];
    }

    return rawRequests
      .filter((item) => typeof item === "string")
      .map((title, index) => ({
        id: `${result.cluster}-${index}`,
        title,
        description: `Suggested from complaint cluster ${result.cluster}.`,
        mentions: result.documents,
      }));
  });

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Feature Requests
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Potential features identified from the analyzed repository.
        </p>
      </div>

      {featureRequests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No structured feature requests were returned by the analysis yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {featureRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white">
                {request.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {request.description}
              </p>

              <div className="mt-5 rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  Documents in source cluster
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {request.mentions.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeatureRequestList;
