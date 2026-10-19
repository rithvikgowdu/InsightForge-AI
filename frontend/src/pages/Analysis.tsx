
import { useEffect, useState } from "react";

import RepositoryAnalysisForm from "../components/analysis/RepositoryAnalysisForm";
import AnalysisStatus from "../components/analysis/AnalysisStatus";
import AnalysisFilters from "../components/analysis/AnalysisFilters";
import AnalysisSummary from "../components/analysis/AnalysisSummary";
import ComplaintClusters from "../components/analysis/ComplaintClusters";
import ComplaintDetailsSection from "../components/analysis/ComplaintDetailsSection";
import SentimentOverview from "../components/analysis/SentimentOverview";
import ClassificationBreakdown from "../components/analysis/ClassificationBreakdown";
import FeatureRequestList from "../components/analysis/FeatureRequestList";
import TrendIntelligence from "../components/analysis/TrendIntelligence";
import OpportunityIntelligence from "../components/analysis/OpportunityIntelligence";

import {
  getAnalysisHistory,
  type Analysis as AnalysisType,
  type AnalysisResult,
} from "../services/api";

function Analysis() {
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisType | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const history = await getAnalysisHistory();
        if (cancelled) return;

        const completed = history
          .filter((item) => item.status === "completed")
          .sort(
            (a, b) =>
              new Date(b.created_at ?? 0).getTime() -
              new Date(a.created_at ?? 0).getTime()
          );

        if (completed.length > 0) {
          setSelectedAnalysis((current) => {
            // Preserve a newer analysis started while history was loading.
            if (
              current &&
              new Date(current.created_at ?? 0).getTime() >=
                new Date(completed[0].created_at ?? 0).getTime()
            ) {
              return current;
            }

            return completed[0];
          });
        }
      } catch (error) {
        if (!cancelled) {
          setHistoryError(
            error instanceof Error
              ? error.message
              : "Could not load analysis history."
          );
        }
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    }

    void loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  const rawClusters = selectedAnalysis?.results?.clusters;

  const clusters: AnalysisResult[] = Array.isArray(rawClusters)
    ? rawClusters.filter(
        (cluster): cluster is AnalysisResult =>
          cluster !== null &&
          typeof cluster === "object" &&
          typeof cluster.cluster === "number" &&
          typeof cluster.documents === "number" &&
          typeof cluster.summary === "string"
      )
    : [];

  const opportunities = clusters.filter(
    (cluster) => cluster.opportunity != null
  );

  const featureRequestCount = clusters.reduce((total, cluster) => {
    const data = cluster.opportunity as
      | Record<string, unknown>
      | undefined;

    if (!data) return total;

    const features =
      data.featureRequests ??
      data.feature_requests ??
      data.features ??
      data.mvpFeatures ??
      data.mvp_features;

    return (
      total +
      (Array.isArray(features)
        ? features.filter(
            (feature) =>
              typeof feature === "string" &&
              feature.trim().length > 0 &&
              feature.toLowerCase() !== "none"
          ).length
        : 0)
    );
  }, 0);

  const analysisSummary = {
    industry: selectedAnalysis?.repository || "GitHub Repository",
    totalMentions: clusters.reduce(
      (total, cluster) => total + cluster.documents,
      0
    ),
    complaintClusters:
      selectedAnalysis?.total_clusters ?? clusters.length,
    featureRequests: featureRequestCount,
    opportunities: opportunities.length,
  };

  return (
    <main className="w-full min-w-0 space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-400">
          Product Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Analysis
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Discover recurring customer problems, feature requests,
          emerging trends, and product opportunities from public
          discussions.
        </p>
      </section>

      <RepositoryAnalysisForm onStarted={setSelectedAnalysis} />

      {selectedAnalysis && (
        <AnalysisStatus
          analysis={selectedAnalysis}
          onCompleted={setSelectedAnalysis}
        />
      )}

      {loadingHistory && (
        <p className="text-sm text-slate-400">
          Loading your previous analyses...
        </p>
      )}

      {historyError && (
        <p role="alert" className="text-sm text-red-400">
          Could not load previous analyses: {historyError}
        </p>
      )}

      <section aria-label="Analysis filters">
        <AnalysisFilters />
      </section>

      <AnalysisSummary
        industry={analysisSummary.industry}
        totalMentions={analysisSummary.totalMentions}
        complaintClusters={analysisSummary.complaintClusters}
        featureRequests={analysisSummary.featureRequests}
        opportunities={analysisSummary.opportunities}
      />

      <ComplaintClusters results={clusters} />
      <ComplaintDetailsSection results={clusters} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SentimentOverview />
        <ClassificationBreakdown />
        <FeatureRequestList results={clusters} />
        <TrendIntelligence results={clusters} />
        <OpportunityIntelligence results={clusters} />
      </div>

      {!loadingHistory && !selectedAnalysis && (
        <section
          aria-labelledby="start-analysis-title"
          className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center"
        >
          <h2
            id="start-analysis-title"
            className="text-xl font-semibold text-white"
          >
            Start an Analysis
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Enter a GitHub owner and repository above to discover
            what users are complaining about, requesting, and discussing.
          </p>
        </section>
      )}
    </main>
  );
}

export default Analysis;
