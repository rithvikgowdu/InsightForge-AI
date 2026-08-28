import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  getAnalysisHistory,
  getAnalysisById,
} from "../services/analysis.service";

import type {
  AnalysisHistoryResponse,
  AnalysisResponse,
  ClusterResult,
} from "../types/analysis";

interface Opportunity {
  problem_statement?: string;
  business_opportunity?: string;
  ai_solution?: string;
  target_customers?: string;
  mvp_features?: string[];
  market_potential?: string;
  confidence_score?: number;
}

function Reports() {
  const [history, setHistory] = useState<
    AnalysisHistoryResponse[]
  >([]);

  const [selectedReport, setSelectedReport] =
    useState<AnalysisResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAnalysisHistory();

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

        setHistory(sorted);
      } catch (err) {
        console.error("Failed to load reports:", err);
        setError(
          "Unable to load analysis reports. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const openReport = async (analysisId: number) => {
    try {
      setLoadingReport(true);
      setError("");

      const report = await getAnalysisById(analysisId);

      setSelectedReport(report);
    } catch (err) {
      console.error("Failed to load report:", err);
      setError(
        "Unable to load this report. Please try again."
      );
    } finally {
      setLoadingReport(false);
    }
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  const getClusters = (
    report: AnalysisResponse
  ): ClusterResult[] => {
    if (Array.isArray(report.results)) {
      return report.results;
    }

    if (
      report.results &&
      typeof report.results === "object" &&
      "clusters" in report.results
    ) {
      const clusters = (
        report.results as {
          clusters?: ClusterResult[];
        }
      ).clusters;

      if (Array.isArray(clusters)) {
        return clusters;
      }
    }

    return [];
  };

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INSIGHTFORGE AI</p>

            <h1 style={styles.title}>Reports</h1>

            <p style={styles.subtitle}>
              Review previous repository analyses and explore
              the product opportunities discovered by InsightForge AI.
            </p>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            <strong>Something went wrong</strong>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            Loading analysis reports...
          </div>
        )}

        {!loading && history.length === 0 && (
          <div style={styles.empty}>
            <h2>No reports yet</h2>

            <p>
              Run a repository analysis to generate your first
              report.
            </p>
          </div>
        )}

        {!loading && history.length > 0 && !selectedReport && (
          <section>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Analysis History
                </h2>

                <p style={styles.sectionSubtitle}>
                  Your previously generated repository analyses.
                </p>
              </div>

              <span style={styles.countBadge}>
                {history.length}{" "}
                {history.length === 1
                  ? "report"
                  : "reports"}
              </span>
            </div>

            <div style={styles.reportList}>
              {history.map((report) => (
                <article
                  key={report.id}
                  style={styles.reportCard}
                >
                  <div>
                    <p style={styles.repositoryLabel}>
                      REPOSITORY
                    </p>

                    <h3 style={styles.repository}>
                      {report.repository}
                    </h3>

                    <div style={styles.meta}>
                      <span
                        style={{
                          ...styles.status,
                          ...(report.status === "completed"
                            ? styles.completed
                            : styles.otherStatus),
                        }}
                      >
                        {report.status}
                      </span>

                      <span>
                        {report.total_clusters}{" "}
                        {report.total_clusters === 1
                          ? "cluster"
                          : "clusters"}
                      </span>

                      <span>
                        {new Date(
                          report.created_at
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {report.status === "completed" && (
  <button
    type="button"
    onClick={() => openReport(report.id)}
    disabled={loadingReport}
    style={styles.viewButton}
  >
    {loadingReport ? "Loading..." : "View Report"}
  </button>
)}
                </article>
              ))}
            </div>
          </section>
        )}

        {selectedReport && (
          <section>
            <button
              type="button"
              onClick={closeReport}
              style={styles.backButton}
            >
              ← Back to Reports
            </button>

            <div style={styles.reportHeader}>
              <div>
                <p style={styles.eyebrow}>ANALYSIS REPORT</p>

                <h2 style={styles.reportTitle}>
                  {selectedReport.repository}
                </h2>

                <p style={styles.reportSubtitle}>
                  AI-generated insights from repository issue
                  analysis.
                </p>
              </div>

              <span style={styles.completedLarge}>
                {selectedReport.status}
              </span>
            </div>

            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <span style={styles.summaryLabel}>
                  Repository
                </span>

                <strong>
                  {selectedReport.repository}
                </strong>
              </div>

              <div style={styles.summaryCard}>
                <span style={styles.summaryLabel}>
                  Total Clusters
                </span>

                <strong style={styles.number}>
                  {selectedReport.total_clusters}
                </strong>
              </div>

              <div style={styles.summaryCard}>
                <span style={styles.summaryLabel}>
                  Report ID
                </span>

                <strong>#{selectedReport.id}</strong>
              </div>
            </div>

            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Product Opportunities
                </h2>

                <p style={styles.sectionSubtitle}>
                  Recurring issues transformed into actionable
                  opportunities.
                </p>
              </div>
            </div>

            <div style={styles.clusterList}>
              {getClusters(selectedReport).map((cluster) => {
                const opportunity =
                  cluster.opportunity as Opportunity;

                const confidence =
                  typeof opportunity.confidence_score ===
                  "number"
                    ? Math.round(
                        opportunity.confidence_score * 100
                      )
                    : null;

                return (
                  <article
                    key={cluster.cluster}
                    style={styles.clusterCard}
                  >
                    <div style={styles.clusterHeader}>
                      <div>
                        <span style={styles.clusterLabel}>
                          CLUSTER {cluster.cluster}
                        </span>

                        <h3 style={styles.clusterTitle}>
                          {cluster.documents}{" "}
                          {cluster.documents === 1
                            ? "document"
                            : "documents"}
                        </h3>
                      </div>

                      {opportunity.market_potential && (
                        <span
                          style={{
                            ...styles.marketBadge,
                            ...(opportunity.market_potential ===
                            "High"
                              ? styles.high
                              : opportunity.market_potential ===
                                  "Medium"
                                ? styles.medium
                                : styles.low),
                          }}
                        >
                          {opportunity.market_potential} Market
                        </span>
                      )}
                    </div>

                    <div style={styles.summaryBox}>
                      <h4 style={styles.heading}>
                        Issue Summary
                      </h4>

                      <p style={styles.text}>
                        {cluster.summary}
                      </p>
                    </div>

                    <div style={styles.content}>
                      <div style={styles.opportunityBox}>
                        <h4 style={styles.opportunityHeading}>
                          💡 Product Opportunity
                        </h4>

                        <p style={styles.text}>
                          {opportunity.business_opportunity ||
                            "Not available"}
                        </p>
                      </div>

                      <div style={styles.detailsGrid}>
                        <div>
                          <h4 style={styles.heading}>
                            Problem Statement
                          </h4>

                          <p style={styles.text}>
                            {opportunity.problem_statement ||
                              "Not available"}
                          </p>
                        </div>

                        <div>
                          <h4 style={styles.heading}>
                            AI Solution
                          </h4>

                          <p style={styles.text}>
                            {opportunity.ai_solution ||
                              "Not available"}
                          </p>
                        </div>

                        <div>
                          <h4 style={styles.heading}>
                            Target Customers
                          </h4>

                          <p style={styles.text}>
                            {opportunity.target_customers ||
                              "Not available"}
                          </p>
                        </div>

                        <div>
                          <h4 style={styles.heading}>
                            MVP Features
                          </h4>

                          {Array.isArray(
                            opportunity.mvp_features
                          ) ? (
                            <ul style={styles.featureList}>
                              {opportunity.mvp_features.map(
                                (feature, index) => (
                                  <li key={index}>
                                    {feature}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p style={styles.text}>
                              Not available
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={styles.confidence}>
                        <div>
                          <span style={styles.heading}>
                            Confidence
                          </span>

                          <strong>
                            {confidence !== null
                              ? `${confidence}%`
                              : "N/A"}
                          </strong>
                        </div>

                        {confidence !== null && (
                          <div
                            style={styles.progressBackground}
                          >
                            <div
                              style={{
                                ...styles.progress,
                                width: `${confidence}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#172033",
  },

  header: {
    marginBottom: "30px",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1.4px",
    color: "#2563eb",
  },

  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: 750,
  },

  subtitle: {
    maxWidth: "700px",
    marginTop: "10px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "23px",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  countBadge: {
    padding: "7px 12px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 700,
  },

  reportList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  reportCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "22px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
  },

  repositoryLabel: {
    margin: "0 0 5px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1px",
    color: "#94a3b8",
  },

  repository: {
    margin: 0,
    fontSize: "19px",
  },

  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
    color: "#64748b",
    fontSize: "12px",
  },

  status: {
    padding: "4px 8px",
    borderRadius: "999px",
    fontWeight: 700,
    textTransform: "capitalize",
  },

  completed: {
    background: "#dcfce7",
    color: "#166534",
  },

  otherStatus: {
    background: "#f1f5f9",
    color: "#475569",
  },

  viewButton: {
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: 650,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  backButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    marginBottom: "22px",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: 650,
    cursor: "pointer",
  },

  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "25px",
  },

  reportTitle: {
    margin: 0,
    fontSize: "30px",
  },

  reportSubtitle: {
    marginTop: "7px",
    color: "#64748b",
  },

  completedLarge: {
    padding: "7px 12px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "capitalize",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "35px",
  },

  summaryCard: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    padding: "19px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
  },

  summaryLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: ".7px",
    color: "#94a3b8",
    fontWeight: 700,
  },

  number: {
    color: "#2563eb",
    fontSize: "25px",
  },

  clusterList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  clusterCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(15, 23, 42, 0.04)",
  },

  clusterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 22px",
    borderBottom: "1px solid #e2e8f0",
  },

  clusterLabel: {
    fontSize: "10px",
    fontWeight: 750,
    letterSpacing: "1px",
    color: "#2563eb",
  },

  clusterTitle: {
    margin: "5px 0 0",
    fontSize: "18px",
  },

  marketBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 700,
  },

  high: {
    background: "#dcfce7",
    color: "#166534",
  },

  medium: {
    background: "#fef3c7",
    color: "#92400e",
  },

  low: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  summaryBox: {
    padding: "19px 22px",
    background: "#f8fafc",
  },

  content: {
    padding: "22px",
  },

  opportunityBox: {
    padding: "16px",
    marginBottom: "22px",
    borderRadius: "10px",
    background: "#eff6ff",
    border: "1px solid #dbeafe",
  },

  opportunityHeading: {
    margin: "0 0 8px",
    fontSize: "14px",
  },

  heading: {
    margin: "0 0 7px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".6px",
    color: "#64748b",
  },

  text: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.65,
    color: "#475569",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
  },

  featureList: {
    margin: 0,
    paddingLeft: "20px",
    color: "#475569",
    fontSize: "13px",
    lineHeight: 1.8,
  },

  confidence: {
    marginTop: "22px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },

  progressBackground: {
    width: "100%",
    height: "7px",
    marginTop: "9px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "999px",
  },

  loading: {
    padding: "35px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    color: "#64748b",
  },

  empty: {
    padding: "50px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
  },

  error: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "15px",
    marginBottom: "20px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    color: "#991b1b",
    fontSize: "13px",
  },
};

export default Reports;