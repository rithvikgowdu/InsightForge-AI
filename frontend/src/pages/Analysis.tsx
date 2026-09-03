import { useState } from "react";

import AnalysisSearch from "../components/analysis/AnalysisSearch";
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
  startAnalysis,
  type Analysis as AnalysisType,
} from "../services/api";

function Analysis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisType | null>(null);

  const analysisSummary = {
    industry: searchQuery || "Food Delivery",
    totalMentions: 1284,
    complaintClusters: 42,
    featureRequests: 17,
    opportunities: 8,
  };

  const handleSearch = async (
    owner: string,
    repository: string,
    limit: number
  ) => {
    setLoading(true);
    setError("");
    setSelectedAnalysis(null);
    setSearchQuery(`${owner}/${repository}`);

    try {
      const analysis = await startAnalysis({
        owner,
        repository,
        limit,
      });

      setSelectedAnalysis(analysis);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start the analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-w-0 space-y-8">

      {/* Page Header */}
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

      {/* Search */}
      <section aria-label="Analysis search">
        <AnalysisSearch
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}
      </section>

      {/* Analysis Status */}
      {selectedAnalysis && (
        <AnalysisStatus
          analysis={selectedAnalysis}
          onCompleted={setSelectedAnalysis}
        />
      )}

      {/* Filters */}
      <section aria-label="Analysis filters">
        <AnalysisFilters />
      </section>

      {/* Summary */}
      <AnalysisSummary
        industry={analysisSummary.industry}
        totalMentions={analysisSummary.totalMentions}
        complaintClusters={analysisSummary.complaintClusters}
        featureRequests={analysisSummary.featureRequests}
        opportunities={analysisSummary.opportunities}
      />

      {/* Complaint Clusters */}
     <ComplaintClusters
  results={selectedAnalysis?.results ?? []}
/>

      {/* Complaint Details */}
      <ComplaintDetailsSection />

      {/* Intelligence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <SentimentOverview
          negative={68}
          neutral={22}
          positive={10}
        />

        <ClassificationBreakdown />

        <FeatureRequestList />

        <TrendIntelligence />

        <OpportunityIntelligence />

      </div>

      {/* Empty State */}
      {!selectedAnalysis && (
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
            what users are complaining about, requesting, and
            discussing.
          </p>
        </section>
      )}

    </main>
  );
}

export default Analysis;