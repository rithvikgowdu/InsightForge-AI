import ReportHeader from "../components/reports/ReportHeader";
import ExecutiveSummary from "../components/reports/ExecutiveSummary";
import KeyFindings from "../components/reports/KeyFindings";
import ReportProblems from "../components/reports/ReportProblems";
import ReportOpportunities from "../components/reports/ReportOpportunities";
import ReportMetadata from "../components/reports/ReportMetadata";
import ReportTrends from "../components/reports/ReportTrends";
import ReportFeatureRequests from "../components/reports/ReportFeatureRequests";
import RecommendedMVP from "../components/reports/RecommendedMVP";

function Report() {
  const report = {
    title: "Food Delivery Market Intelligence",
    industry: "Food Delivery",
    generatedAt: "Today",
    summary:
      "The analysis identifies late deliveries, high delivery fees, and poor customer support as the most significant customer pain points. Demand for better delivery visibility is increasing, while AI-powered delivery prediction represents a strong product opportunity.",
  };

  return (
    <main className="w-full min-w-0 space-y-8">

      {/* Report Header */}
      <section aria-label="Report header">
        <ReportHeader
          title={report.title}
          industry={report.industry}
          generatedAt={report.generatedAt}
        />
      </section>


      {/* Report Metadata */}
      <section aria-label="Report metadata">
        <ReportMetadata
          sources={["Reddit", "GitHub"]}
          timeRange="Last 30 days"
          totalMentions={1284}
          clusters={42}
        />
      </section>


      {/* Executive Summary */}
      <section aria-label="Executive summary">
        <ExecutiveSummary
          summary={report.summary}
        />
      </section>


      {/* Key Findings */}
      <section aria-label="Key findings">
        <KeyFindings />
      </section>


      {/* Customer Problems */}
      <section aria-label="Customer problems">
        <ReportProblems />
      </section>


      {/* Emerging Trends */}
      <section aria-label="Report trends">
        <ReportTrends />
      </section>


      {/* Feature Requests */}
      <section aria-label="Feature requests">
        <ReportFeatureRequests />
      </section>


      {/* Opportunities */}
      <section aria-label="Product opportunities">
        <ReportOpportunities />
      </section>


      {/* Recommended MVP */}
      <section aria-label="Recommended MVP">
        <RecommendedMVP />
      </section>

    </main>
  );
}

export default Report;