
import OpportunityDetails from "./OpportunityDetails";
import type { AnalysisResult } from "../../services/api";

type OpportunityIntelligenceProps = {
  results?: AnalysisResult[];
};

function OpportunityIntelligence({
  results = [],
}: OpportunityIntelligenceProps) {
  const opportunities = results
    .filter((result) => result.opportunity != null)
    .map((result) => {
      const opportunity = result.opportunity as Record<string, unknown>;

      const readText = (...keys: string[]): string | undefined => {
        for (const key of keys) {
          const value = opportunity[key];

          if (typeof value === "string" && value.trim()) {
            return value.trim();
          }
        }

        return undefined;
      };

      const readNumber = (...keys: string[]): number | undefined => {
        for (const key of keys) {
          const value = opportunity[key];

          if (typeof value === "number" && Number.isFinite(value)) {
            return value;
          }

          if (
            typeof value === "string" &&
            value.trim() !== "" &&
            Number.isFinite(Number(value))
          ) {
            return Number(value);
          }
        }

        return undefined;
      };

      const readFeatures = (): string[] => {
        const value =
          opportunity.mvpFeatures ??
          opportunity.mvp_features ??
          opportunity.mvp_features_suggestions ??
          opportunity.mvp_features_list;

        return Array.isArray(value)
          ? value.filter(
              (feature): feature is string =>
                typeof feature === "string"
            )
          : [];
      };

      const potential = readText(
        "businessPotential",
        "business_potential",
        "market_potential"
      );

      const businessPotential: "High" | "Medium" | "Low" =
        potential?.toLowerCase() === "high"
          ? "High"
          : potential?.toLowerCase() === "low"
            ? "Low"
            : "Medium";

      // Only display an actual opportunity score supplied by the API.
      // AI confidence is a separate metric and is not substituted here.
      const rawScore = readNumber(
        "opportunity_score",
        "opportunityScore",
        "score"
      );

      const score =
        rawScore !== undefined
          ? Math.max(0, Math.min(10, rawScore))
          : undefined;

      const rawConfidence = readNumber(
        "confidence",
        "confidence_score"
      );

      // Support either a 0–1 confidence value or an already-normalized 0–10 value.
      const confidence =
        rawConfidence === undefined
          ? 0
          : Math.max(
              0,
              Math.min(
                10,
                rawConfidence >= 0 && rawConfidence <= 1
                  ? rawConfidence * 10
                  : rawConfidence
              )
            );

      return {
        cluster: result.cluster,
        title:
          readText("title", "opportunity_title", "name") ??
          `Opportunity from Cluster ${result.cluster}`,
        score,
        problem:
          readText(
            "problem",
            "problem_statement",
            "pain_point"
          ) ?? result.summary,
        whyNow:
          readText("whyNow", "why_now", "timing") ??
          "Historical trend data is needed to explain why this opportunity matters now.",
        aiSolution:
          readText("aiSolution", "ai_solution", "solution") ??
          "Review this complaint cluster to identify a suitable product solution.",
        targetUsers:
          readText(
            "targetUsers",
            "target_users",
            "customer_segment",
            "target_customers"
          ) ?? "Target users have not been specified by the analysis.",
        businessPotential,
        confidence,
        mvpFeatures: readFeatures(),
      };
    });

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Opportunity Intelligence
        </h2>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
          Business opportunities generated from the analyzed
          repository&apos;s complaint clusters.
        </p>
      </div>

      {opportunities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-400">
            No opportunities are available yet. Complete a repository
            analysis that produces opportunity results to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {opportunities.map((opportunity) => (
            <OpportunityDetails
              key={opportunity.cluster}
              title={opportunity.title}
              score={opportunity.score}
              problem={opportunity.problem}
              whyNow={opportunity.whyNow}
              aiSolution={opportunity.aiSolution}
              targetUsers={opportunity.targetUsers}
              businessPotential={opportunity.businessPotential}
              confidence={opportunity.confidence}
              mvpFeatures={opportunity.mvpFeatures}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default OpportunityIntelligence;
