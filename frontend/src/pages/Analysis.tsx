import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  analyzeRepository,
  getAnalysisHistory,
  getAnalysisById,
} from "../services/analysis.service";

import type {
  AnalysisResponse,
  ClusterResult,
} from "../types/analysis";

interface Opportunity {
  problem_statement?: string;
  business_opportunity?: string;
  ai_solution?: string;
  target_customers?: string;
  mvp_features?: string[];
  market_potential?: "Low" | "Medium" | "High" | string;
  confidence_score?: number;
}

function Analysis() {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [limit, setLimit] = useState(20);

  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLatestAnalysis = async () => {
      try {
        const history = await getAnalysisHistory();

        const completedAnalyses = history
          .filter((analysis) => analysis.status === "completed")
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        if (completedAnalyses.length === 0) {
          return;
        }

        const latestAnalysis = await getAnalysisById(
          completedAnalyses[0].id
        );

        setResult(latestAnalysis);
      } catch (err) {
        console.error("Failed to load analysis history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadLatestAnalysis();
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const analysisResult = await analyzeRepository({
        owner,
        repository,
        limit,
      });

      setResult(analysisResult);
    } catch (err) {
      console.error("Analysis request failed:", err);

      setError(
        "Analysis failed. Please check the repository details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const clusters: ClusterResult[] = Array.isArray(result?.results)
  ? result.results
  : result?.results &&
      typeof result.results === "object" &&
      "clusters" in result.results &&
      Array.isArray(
        (result.results as { clusters?: ClusterResult[] }).clusters
      )
    ? (result.results as { clusters: ClusterResult[] }).clusters
    : [];

  const getMarketClass = (market?: string) => {
    if (market === "High") return "high";
    if (market === "Medium") return "medium";
    return "low";
  };

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INSIGHTFORGE AI</p>

            <h1 style={styles.title}>Repository Analysis</h1>

            <p style={styles.subtitle}>
              Analyze GitHub issues to discover recurring problems,
              product opportunities, and potential AI solutions.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
           <label htmlFor="owner" style={styles.label}>
  GitHub Owner
</label>

<span style={styles.inputHint}>
  The GitHub username or organization.
</span>

            <input
              id="owner"
              type="text"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              placeholder="e.g. microsoft"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
           <label htmlFor="repository" style={styles.label}>
  Repository
</label>

<span style={styles.inputHint}>
  The name of the GitHub repository.
</span>

            <input
              id="repository"
              type="text"
              value={repository}
              onChange={(event) =>
                setRepository(event.target.value)
              }
              placeholder="e.g. vscode"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="limit" style={styles.label}>
  Issues to analyze
</label>

<span style={styles.inputHint}>
  More issues may produce richer insights.
</span>

            <input
              id="limit"
              type="number"
              min="1"
              max="100"
              value={limit}
              onChange={(event) =>
                setLimit(Number(event.target.value))
              }
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Analyzing..." : "Analyze Repository"}
          </button>
        </form>

        {error && (
          <div style={styles.error} role="alert">
            <strong>Analysis failed</strong>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div style={styles.loadingCard}>
            <div style={styles.spinner} />
            <div>
              <strong>Analyzing repository...</strong>
              <p style={styles.loadingText}>
                Fetching issues and generating AI insights.
              </p>
            </div>
          </div>
        )}

        {loadingHistory && !result && !loading && (
          <div style={styles.loadingCard}>
            <div style={styles.spinner} />
            <div>
              <strong>Loading latest analysis...</strong>
            </div>
          </div>
        )}

        {result && !loading && (
          <>
            <section style={styles.overview}>
              <div style={styles.overviewCard}>
                <span style={styles.overviewLabel}>
                  Repository
                </span>

                <strong style={styles.overviewValue}>
                  {result.repository}
                </strong>
              </div>

              <div style={styles.overviewCard}>
                <span style={styles.overviewLabel}>Status</span>

                <strong style={styles.statusBadge}>
                  {result.status}
                </strong>
              </div>

              <div style={styles.overviewCard}>
                <span style={styles.overviewLabel}>
                  Total Clusters
                </span>

                <strong style={styles.overviewNumber}>
                  {result.total_clusters}
                </strong>
              </div>
            </section>

            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Detected Opportunities
                </h2>

                <p style={styles.sectionSubtitle}>
                  Recurring issues grouped into actionable product
                  opportunities.
                </p>
              </div>
            </div>

            {clusters.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No clusters found</h3>

                <p>
                  The analysis completed, but no meaningful issue
                  clusters were detected.
                </p>
              </div>
            ) : (
              <div style={styles.clusterGrid}>
                {clusters.map((cluster) => {
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
                            CLUSTER
                          </span>

                          <h3 style={styles.clusterTitle}>
                            Cluster {cluster.cluster}
                          </h3>
                        </div>

                        <span style={styles.documentsBadge}>
                          {cluster.documents}{" "}
                          {cluster.documents === 1
                            ? "document"
                            : "documents"}
                        </span>
                      </div>

                      <div style={styles.summaryBox}>
                        <h4 style={styles.cardHeading}>
                          Issue Summary
                        </h4>

                        <p style={styles.bodyText}>
                          {cluster.summary}
                        </p>
                      </div>

                      <div style={styles.opportunitySection}>
                        <div style={styles.sectionAccent}>
                          <span>💡</span>

                          <h4 style={styles.opportunityTitle}>
                            Product Opportunity
                          </h4>
                        </div>

                        <div style={styles.detailGrid}>
                          <div style={styles.detailItem}>
                            <h5 style={styles.detailTitle}>
                              Problem Statement
                            </h5>

                            <p style={styles.bodyText}>
                              {opportunity.problem_statement ||
                                "Not available"}
                            </p>
                          </div>

                          <div style={styles.detailItem}>
                            <h5 style={styles.detailTitle}>
                              Business Opportunity
                            </h5>

                            <p style={styles.bodyText}>
                              {opportunity.business_opportunity ||
                                "Not available"}
                            </p>
                          </div>

                          <div style={styles.detailItem}>
                            <h5 style={styles.detailTitle}>
                              AI Solution
                            </h5>

                            <p style={styles.bodyText}>
                              {opportunity.ai_solution ||
                                "Not available"}
                            </p>
                          </div>

                          <div style={styles.detailItem}>
                            <h5 style={styles.detailTitle}>
                              Target Customers
                            </h5>

                            <p style={styles.bodyText}>
                              {opportunity.target_customers ||
                                "Not available"}
                            </p>
                          </div>
                        </div>

                        <div style={styles.mvpSection}>
                          <h5 style={styles.detailTitle}>
                            MVP Features
                          </h5>

                          {Array.isArray(
                            opportunity.mvp_features
                          ) ? (
                            <div style={styles.featureList}>
                              {opportunity.mvp_features.map(
                                (feature, index) => (
                                  <div
                                    key={index}
                                    style={styles.feature}
                                  >
                                    <span style={styles.check}>
                                      ✓
                                    </span>

                                    <span>{feature}</span>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p style={styles.bodyText}>
                              Not available
                            </p>
                          )}
                        </div>

                        <div style={styles.metrics}>
                          <div style={styles.metric}>
                            <span style={styles.metricLabel}>
                              Market Potential
                            </span>

                            <span
                              style={{
                                ...styles.marketBadge,
                                ...(getMarketClass(
                                  opportunity.market_potential
                                ) === "high"
                                  ? styles.marketHigh
                                  : getMarketClass(
                                        opportunity.market_potential
                                      ) === "medium"
                                    ? styles.marketMedium
                                    : styles.marketLow),
                              }}
                            >
                              {opportunity.market_potential ||
                                "Unknown"}
                            </span>
                          </div>

                          <div style={styles.metric}>
                            <span style={styles.metricLabel}>
                              Confidence
                            </span>

                            <div style={styles.confidenceWrapper}>
                              <span
                                style={styles.confidenceValue}
                              >
                                {confidence !== null
                                  ? `${confidence}%`
                                  : "N/A"}
                              </span>

                              {confidence !== null && (
                                <div
                                  style={styles.progressBackground}
                                >
                                  <div
                                    style={{
                                      ...styles.progressBar,
                                      width: `${confidence}%`,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#172033",
  },

  header: {
    marginBottom: "28px",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#2563eb",
  },

  title: {
    margin: "0",
    fontSize: "36px",
    fontWeight: 750,
    letterSpacing: "-1px",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "0",
    maxWidth: "720px",
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#64748b",
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "minmax(180px, 1fr) minmax(180px, 1fr) 160px auto",
    gap: "14px",
    alignItems: "end",
    padding: "22px",
    marginBottom: "28px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.05)",
  },

 inputGroup: {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
},
  
inputHint: {
  marginTop: "-2px",
  fontSize: "11px",
  color: "#94a3b8",
},
  label: {
    fontSize: "13px",
    fontWeight: 650,
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    background: "#ffffff",
  },

  button: {
    border: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 650,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  buttonDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  error: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "14px 16px",
    marginBottom: "24px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    color: "#991b1b",
    fontSize: "14px",
  },

  loadingCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "20px",
    marginBottom: "24px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
  },

  spinner: {
    width: "22px",
    height: "22px",
    border: "3px solid #dbeafe",
    borderTop: "3px solid #2563eb",
    borderRadius: "50%",
  },

  loadingText: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  overview: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "36px",
  },

  overviewCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
  },

  overviewLabel: {
    fontSize: "12px",
    fontWeight: 650,
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    color: "#94a3b8",
  },

  overviewValue: {
    fontSize: "17px",
    color: "#172033",
  },

  overviewNumber: {
    fontSize: "28px",
    color: "#2563eb",
  },

  statusBadge: {
    width: "fit-content",
    padding: "5px 10px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "13px",
    textTransform: "capitalize",
  },

  sectionHeader: {
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: "0",
    fontSize: "24px",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  clusterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  clusterCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(15, 23, 42, 0.05)",
  },

  clusterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 22px",
    borderBottom: "1px solid #e2e8f0",
  },

  clusterLabel: {
    display: "block",
    marginBottom: "4px",
    fontSize: "10px",
    fontWeight: 750,
    letterSpacing: "1.2px",
    color: "#2563eb",
  },

  clusterTitle: {
    margin: "0",
    fontSize: "21px",
  },

  documentsBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 600,
  },

  summaryBox: {
    padding: "18px 22px",
    background: "#f8fafc",
  },

  cardHeading: {
    margin: "0 0 8px",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    color: "#64748b",
  },

  bodyText: {
    margin: "0",
    fontSize: "14px",
    lineHeight: 1.65,
    color: "#475569",
  },

  opportunitySection: {
    padding: "22px",
  },

  sectionAccent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },

  opportunityTitle: {
    margin: "0",
    fontSize: "17px",
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  detailItem: {
    minWidth: 0,
  },

  detailTitle: {
    margin: "0 0 7px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#334155",
  },

  mvpSection: {
    marginTop: "22px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },

  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "9px",
    padding: "9px 10px",
    borderRadius: "8px",
    background: "#f8fafc",
    fontSize: "13px",
    color: "#475569",
  },

  check: {
    color: "#16a34a",
    fontWeight: 750,
  },

  metrics: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "22px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },

  metric: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  metricLabel: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    color: "#94a3b8",
  },

  marketBadge: {
    width: "fit-content",
    padding: "5px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
  },

  marketHigh: {
    background: "#dcfce7",
    color: "#166534",
  },

  marketMedium: {
    background: "#fef3c7",
    color: "#92400e",
  },

  marketLow: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  confidenceWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  confidenceValue: {
    fontSize: "14px",
    fontWeight: 750,
    minWidth: "38px",
  },

  progressBackground: {
    flex: 1,
    height: "7px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "999px",
  },

  emptyState: {
    padding: "40px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
  },
};

export default Analysis;