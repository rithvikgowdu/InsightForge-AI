
import { useEffect, useState } from "react";
import {
  getAnalysisHistory,
  type Analysis,
} from "../services/api";

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
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAnalyses() {
      try {
        const history = await getAnalysisHistory();

        if (!cancelled) {
          const completed = history.filter(
            (item) => item.status === "completed"
          );

          setAnalyses(completed);

          if (completed.length > 0) {
            setSelectedId(String(completed[0].id));
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load report data."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalyses();

    return () => {
      cancelled = true;
    };
  }, []);

  const analysis = analyses.find(
    (item) => String(item.id) === selectedId
  );

  const clusters = analysis?.results?.clusters ?? [];

  const totalMentions = clusters.reduce(
    (total, cluster) => total + cluster.documents,
    0
  );

  const opportunityCount = clusters.filter(
    (cluster) => cluster.opportunity != null
  ).length;

  const summary = analysis
    ? `Analysis of ${analysis.repository} identified ${clusters.length} complaint clusters containing ${totalMentions} associated documents and ${opportunityCount} clusters with identified opportunities. This summary is based on the saved analysis results.`
    : "A report will be available after an analysis completes successfully.";

  const reportContent = [
    "INSIGHTFORGE AI — REPOSITORY INTELLIGENCE REPORT",
    `Repository: ${analysis?.repository ?? "Unavailable"}`,
    `Generated: ${
      analysis?.created_at
        ? new Date(analysis.created_at).toLocaleString()
        : "Date unavailable"
    }`,
    "",
    "EXECUTIVE SUMMARY",
    summary,
    "",
    "KEY FINDINGS",
    ...clusters.map(
      (cluster) =>
        `Cluster ${cluster.cluster}: ${cluster.summary} (${cluster.documents} discussions; Pain Score: ${typeof cluster.pain_score === "number" ? cluster.pain_score : "Unavailable"}; Growth: ${typeof cluster.growth === "number" ? `${cluster.growth}%` : "Unavailable"})`
    ),
    "",
    "PRODUCT OPPORTUNITIES",
    ...clusters
      .filter((cluster) => cluster.opportunity != null)
      .map(
        (cluster) =>
          `Cluster ${cluster.cluster}: ${JSON.stringify(cluster.opportunity, null, 2)}`
      ),
  ].join("\n");

  return (
    <main className="w-full min-w-0 space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white">
          Analysis Reports
        </h1>

        <p className="mt-2 text-slate-400">
          Reports generated from your completed repository analyses.
        </p>
      </section>

      {loading ? (
        <p className="text-sm text-slate-400">
          Loading completed analyses...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : analyses.length === 0 ? (
        <section className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8">
          <h2 className="text-lg font-semibold text-white">
            No completed reports yet
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Complete an analysis successfully to see its report here.
          </p>
        </section>
      ) : (
        <>
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <label
              htmlFor="report-analysis"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Select an analysis
            </label>

            <select
              id="report-analysis"
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              {analyses.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.repository} — Analysis #{item.id}
                </option>
              ))}
            </select>
          </section>

          {analysis && (
            <>
              <ReportHeader
                title={`Repository Intelligence: ${analysis.repository}`}
                industry={analysis.repository}
                generatedAt={
                  analysis.created_at
                    ? new Date(analysis.created_at).toLocaleString()
                    : "Date unavailable"
                }
                reportContent={reportContent}
              />

              <ReportMetadata
                sources={["GitHub"]}
                timeRange="Available analysis data"
                totalMentions={totalMentions}
                clusters={clusters.length}
              />

              <ExecutiveSummary summary={summary} />

              <KeyFindings results={clusters} />

              <ReportProblems results={clusters} />

              <ReportTrends results={clusters} />

              <ReportFeatureRequests results={clusters} />

              <ReportOpportunities results={clusters} />

              <RecommendedMVP results={clusters} />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default Report;
