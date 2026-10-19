
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAnalysisHistory,
  type Analysis,
} from "../services/api";

import SearchBar from "../components/dashboard/SearchBar";
import StatsCard from "../components/dashboard/StatsCard";
import ComplaintCard from "../components/dashboard/ComplaintCard";
import TrendCard from "../components/dashboard/TrendCard";
import RecentSearches from "../components/dashboard/RecentSearches";

function Dashboard() {
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const history = await getAnalysisHistory();

        if (!cancelled) {
          setAnalyses(history);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load analysis history."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  const completedAnalyses = analyses
    .filter((analysis) => analysis.status === "completed")
    .sort((a, b) => {
      const aTime = a.created_at
        ? new Date(a.created_at).getTime()
        : 0;
      const bTime = b.created_at
        ? new Date(b.created_at).getTime()
        : 0;

      return bTime - aTime;
    });

  const allClusters = completedAnalyses.flatMap(
    (analysis) => analysis.results?.clusters ?? []
  );

  const opportunities = allClusters.filter(
    (cluster) => cluster.opportunity != null
  );

  const latestAnalysis = completedAnalyses[0];
  const latestClusters = latestAnalysis?.results?.clusters ?? [];
  const latestCluster = latestClusters[0];

  const painScore =
    typeof latestCluster?.pain_score === "number" &&
    Number.isFinite(latestCluster.pain_score)
      ? latestCluster.pain_score
      : null;

  const growth =
    typeof latestCluster?.growth === "number" &&
    Number.isFinite(latestCluster.growth)
      ? latestCluster.growth
      : null;

  const trendData = [...completedAnalyses]
    .reverse()
    .slice(-6)
    .map((analysis) => ({
      month: analysis.created_at
        ? new Date(analysis.created_at).toLocaleDateString(
            undefined,
            { month: "short", day: "2-digit" }
          )
        : `Analysis ${analysis.id}`,
      mentions: (analysis.results?.clusters ?? []).reduce(
        (total, cluster) => total + cluster.documents,
        0
      ),
    }));

  const featureRequests = allClusters.filter((cluster) => {
    const opportunity = cluster.opportunity;

    if (!opportunity || typeof opportunity !== "object") {
      return false;
    }

    const data = opportunity as Record<string, unknown>;

    return (
      Array.isArray(data.mvp_features) &&
      data.mvp_features.some(
        (feature) =>
          typeof feature === "string" && feature.trim().length > 0
      )
    );
  });

  return (
    <main className="w-full min-w-0 space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-400">
          Product Intelligence
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Welcome back{user?.username ? `, ${user.username}` : ""}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Discover customer problems, emerging trends, feature
          requests, and product opportunities with InsightForge AI.
        </p>
      </section>

      <section aria-label="Dashboard search">
        <SearchBar />
      </section>

      <section aria-labelledby="overview-title">
        <h2 id="overview-title" className="sr-only">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatsCard
            title="Total Analyses"
            value={loading ? "..." : String(completedAnalyses.length)}
          />

          <StatsCard
            title="Opportunities"
            value={loading ? "..." : String(opportunities.length)}
          />

          <StatsCard
            title="Trending Topics"
            value={loading ? "..." : String(allClusters.length)}
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            Could not load dashboard statistics: {error}
          </p>
        )}
      </section>

      <section aria-labelledby="customer-problems-title">
        <div className="mb-4">
          <h2
            id="customer-problems-title"
            className="text-2xl font-semibold text-white"
          >
            Top Customer Problems
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Problems discovered in your latest completed analysis.
          </p>
        </div>

        {latestCluster ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ComplaintCard
              title={`Complaint Cluster ${latestCluster.cluster}`}
              mentions={latestCluster.documents}
              painScore={painScore}
              summary={latestCluster.summary}
            />

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <p className="text-sm text-slate-400">Pain Score</p>

              <p className="mt-2 text-2xl font-bold text-white">
                {painScore !== null
                  ? `${painScore.toFixed(1)}/10`
                  : "Not available"}
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Estimated from complaint severity, cluster frequency,
                and GitHub comment activity. This is a heuristic,
                not a validated measure of user impact.
              </p>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="text-sm text-slate-400">
                  Complaint Growth
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  {growth !== null
                    ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`
                    : "Not available"}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Compared across the backend's configured time windows.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-sm text-slate-400">
            {loading
              ? "Loading analysis results..."
              : "No completed analysis is available yet."}
          </p>
        )}
      </section>

      <section aria-labelledby="emerging-trends-title">
        <div className="mb-4">
          <h2
            id="emerging-trends-title"
            className="text-2xl font-semibold text-white"
          >
            Emerging Trends
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Document counts from recent completed analyses, not a
            prediction of future trends.
          </p>
        </div>

        {trendData.length > 0 ? (
          <TrendCard data={trendData} />
        ) : (
          <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-sm text-slate-400">
            No trend data is available yet.
          </p>
        )}
      </section>

      <section aria-labelledby="opportunity-intelligence-title">
        <div className="mb-4">
          <h2
            id="opportunity-intelligence-title"
            className="text-2xl font-semibold text-white"
          >
            Opportunity Intelligence
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Opportunities returned by completed analyses.
          </p>
        </div>

        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {opportunities.slice(0, 4).map((cluster) => {
              const opportunity =
                cluster.opportunity as Record<string, unknown>;

              const title =
                typeof opportunity.problem_statement === "string"
                  ? opportunity.problem_statement
                  : `Opportunity from Cluster ${cluster.cluster}`;

              const description =
                typeof opportunity.business_opportunity === "string"
                  ? opportunity.business_opportunity
                  : cluster.summary;

              const score =
                typeof opportunity.opportunity_score === "number"
                  ? opportunity.opportunity_score
                  : null;

              return (
                <article
                  key={cluster.cluster}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <h3 className="font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="text-slate-300">
                      Opportunity Score:{" "}
                      {score !== null ? score.toFixed(1) : "Not available"}
                    </span>

                    <span className="text-slate-400">
                      Pain Score:{" "}
                      {typeof cluster.pain_score === "number"
                        ? cluster.pain_score.toFixed(1)
                        : "Not available"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-sm text-slate-400">
            No opportunity data is available yet.
          </p>
        )}
      </section>

      <section aria-labelledby="feature-requests-title">
        <div className="mb-4">
          <h2
            id="feature-requests-title"
            className="text-2xl font-semibold text-white"
          >
            Top Feature Requests
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            MVP feature suggestions generated by the analysis.
          </p>
        </div>

        {featureRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {featureRequests.slice(0, 4).map((cluster) => {
              const opportunity =
                cluster.opportunity as Record<string, unknown>;

              const features = Array.isArray(opportunity.mvp_features)
                ? opportunity.mvp_features.filter(
                    (feature): feature is string =>
                      typeof feature === "string" &&
                      feature.trim().length > 0
                  )
                : [];

              return (
                <article
                  key={cluster.cluster}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <h3 className="font-semibold text-white">
                    Cluster {cluster.cluster} Feature Suggestions
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">
                    {features.map((feature, index) => (
                      <li key={`${cluster.cluster}-${index}`}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-sm text-slate-400">
            No structured feature suggestions are available yet.
          </p>
        )}
      </section>

      <section aria-labelledby="product-opportunities-title">
        <div className="mb-4">
          <h2
            id="product-opportunities-title"
            className="text-2xl font-semibold text-white"
          >
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your recent saved searches and analysis activity.
          </p>
        </div>

        <RecentSearches />
      </section>
    </main>
  );
}

export default Dashboard;
