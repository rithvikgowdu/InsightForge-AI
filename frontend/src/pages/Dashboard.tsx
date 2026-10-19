
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

  const completedAnalyses = analyses.filter(
    (analysis) => analysis.status === "completed"
  );

  const opportunities = completedAnalyses
    .flatMap((analysis) => analysis.results?.clusters ?? [])
    .filter((cluster) => cluster.opportunity != null);

  const trendingTopics = completedAnalyses.flatMap(
    (analysis) => analysis.results?.clusters ?? []
  );

  const latestAnalysis = completedAnalyses[0];
  const latestClusters = latestAnalysis?.results?.clusters ?? [];
  const latestCluster = latestClusters[0];

  const trendData = completedAnalyses
    .slice(0, 4)
    .reverse()
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
            value={loading ? "..." : String(analyses.length)}
          />

          <StatsCard
            title="Opportunities"
            value={loading ? "..." : String(opportunities.length)}
          />

          <StatsCard
            title="Trending Topics"
            value={loading ? "..." : String(trendingTopics.length)}
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
              painScore={null}
              summary={latestCluster.summary}
            />

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
              <p className="text-sm text-slate-400">
                Pain Score
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                Not calculated
              </p>
              <p className="mt-3 text-sm text-slate-400">
                A pain score is not currently provided by the analysis
                API. No score has been inferred.
              </p>
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
            Document counts from your recent completed analyses.
            These are not historical growth measurements.
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
          <p className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-300">
            {opportunities.length} opportunity-bearing clusters found
            across your completed analyses.
          </p>
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
            Feature suggestions returned by the analysis.
          </p>
        </div>

        <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-sm text-slate-400">
          Feature request summaries will appear here when structured
          feature data is available.
        </p>
      </section>

      <section aria-labelledby="product-opportunities-title">
        <div className="mb-4">
          <h2
            id="product-opportunities-title"
            className="text-2xl font-semibold text-white"
          >
            Product Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recent analysis activity and saved searches.
          </p>
        </div>

        <RecentSearches />
      </section>
    </main>
  );
}

export default Dashboard;
