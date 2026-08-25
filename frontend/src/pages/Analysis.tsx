import AnalysisSearch from "../components/analysis/AnalysisSearch";
import AnalysisFilters from "../components/analysis/AnalysisFilters";
import AnalysisSummary from "../components/analysis/AnalysisSummary";
import ComplaintClusters from "../components/analysis/ComplaintClusters";
import ComplaintDetailsSection from "../components/analysis/ComplaintDetailsSection";
import SentimentOverview from "../components/analysis/SentimentOverview";
import ClassificationBreakdown from "../components/analysis/ClassificationBreakdown";
import FeatureRequestList from "../components/analysis/FeatureRequestList";
import TrendIntelligence from "../components/analysis/TrendIntelligence";
import OpportunityIntelligence from "../components/analysis/OpportunityIntelligence";

function Analysis() {
  const analysisSummary = {
  industry: "Food Delivery",
  totalMentions: 1284,
  complaintClusters: 42,
  featureRequests: 17,
  opportunities: 8,
};
  return (
    <div className="space-y-8">
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
      <AnalysisSearch />

      {/* Filters */}
      <AnalysisFilters />
      <AnalysisSummary
  industry={analysisSummary.industry}
  totalMentions={analysisSummary.totalMentions}
  complaintClusters={analysisSummary.complaintClusters}
  featureRequests={analysisSummary.featureRequests}
  opportunities={analysisSummary.opportunities}
/>
<ComplaintClusters />
<ComplaintDetailsSection />
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
      <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
        <h2 className="text-xl font-semibold text-white">
          Start an Analysis
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
          Enter an industry or topic above to discover what users
          are complaining about, requesting, and discussing.
        </p>
      </section>
    </div>
  );
}

export default Analysis;