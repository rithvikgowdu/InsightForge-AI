
import type { AnalysisResult } from "../../services/api";

type RecommendedMVPProps = {
  results?: AnalysisResult[];
};

function RecommendedMVP({ results = [] }: RecommendedMVPProps) {
  const recommendations = results.flatMap((result) => {
    const value = result.opportunity;

    if (!value || typeof value !== "object") {
      return [];
    }

    const data = value as Record<string, unknown>;

    const title =
      data.title ??
      data.name ??
      data.opportunity ??
      data.opportunityTitle ??
      data.opportunity_title;

    const description =
      data.description ??
      data.summary ??
      data.rationale;

    const rawFeatures =
      data.mvpFeatures ??
      data.mvp_features ??
      data.features ??
      data.featureRequests ??
      data.feature_requests ??
      data.mvp;

    const features = Array.isArray(rawFeatures)
      ? rawFeatures.filter(
          (feature): feature is string => typeof feature === "string"
        )
      : typeof rawFeatures === "string"
        ? [rawFeatures]
        : [];

    if (typeof title !== "string" && features.length === 0) {
      return [];
    }

    return [
      {
        key: String(result.cluster),
        cluster: result.cluster,
        title:
          typeof title === "string"
            ? title
            : `MVP recommendation for Cluster ${result.cluster}`,
        description:
          typeof description === "string"
            ? description
            : result.summary,
        features,
      },
    ];
  });

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Recommended MVP
        </h2>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
          Initial product recommendations and features returned by the
          repository analysis.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm leading-6 text-slate-400">
            No MVP recommendations are available yet. This section will
            populate when the analysis returns an opportunity with
            recommended features.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.key}
              className="rounded-xl border border-blue-500/20 bg-slate-900 p-6 shadow-lg"
            >
              <p className="text-sm font-medium text-blue-400">
                Based on Cluster {recommendation.cluster}
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                {recommendation.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {recommendation.description}
              </p>

              {recommendation.features.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {recommendation.features.map((feature, index) => (
                    <div
                      key={`${recommendation.key}-${index}`}
                      className="rounded-lg border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                          {index + 1}
                        </span>

                        <p className="text-sm leading-6 text-slate-300">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecommendedMVP;
