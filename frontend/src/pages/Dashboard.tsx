import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnalysisHistory } from "../services/analysis.service";

import type { AnalysisHistoryResponse } from "../types/analysis";

function Dashboard() {
  const [history, setHistory] = useState<AnalysisHistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Failed to load dashboard:", err);
        setError(
          "Unable to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const completedCount = history.filter(
    (item) => item.status === "completed"
  ).length;

  const failedCount = history.filter(
    (item) => item.status === "failed"
  ).length;

  const totalClusters = history.reduce(
    (total, item) => total + item.total_clusters,
    0
  );

  const recentAnalyses = history.slice(0, 5);

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <header style={styles.header}>
          <div>
            <p style={styles.eyebrow}>INSIGHTFORGE AI</p>

            <h1 style={styles.title}>
              Repository Intelligence Dashboard
            </h1>

            <p style={styles.subtitle}>
              Monitor your repository analyses and the product
              opportunities discovered from recurring issues.
            </p>
          </div>
        </header>

        {error && (
          <div style={styles.error}>
            <strong>Something went wrong</strong>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>
            Loading dashboard...
          </div>
        ) : (
          <>
            <section style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>
                  TOTAL ANALYSES
                </span>

                <strong style={styles.statNumber}>
                  {history.length}
                </strong>

                <span style={styles.statDescription}>
                  Repository analyses
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>
                  COMPLETED
                </span>

                <strong style={styles.statNumber}>
                  {completedCount}
                </strong>

                <span style={styles.statDescription}>
                  Successful analyses
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>
                  CLUSTERS FOUND
                </span>

                <strong style={styles.statNumber}>
                  {totalClusters}
                </strong>

                <span style={styles.statDescription}>
                  Recurring issue groups
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>
                  FAILED
                </span>

                <strong style={styles.statNumber}>
                  {failedCount}
                </strong>

                <span style={styles.statDescription}>
                  Analyses requiring attention
                </span>
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Recent Analyses
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Your latest repository analysis activity.
                  </p>
                </div>

                <a
                  href="/reports"
                  style={styles.viewAll}
                >
                  View all reports →
                </a>
              </div>

              {recentAnalyses.length === 0 ? (
                <div style={styles.empty}>
                  <h3>No analyses yet</h3>

                  <p>
                    Run your first repository analysis to start
                    discovering product opportunities.
                  </p>

                  <a
                    href="/analysis"
                    style={styles.primaryButton}
                  >
                    Analyze Repository
                  </a>
                </div>
              ) : (
                <div style={styles.analysisList}>
                  {recentAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      style={styles.analysisCard}
                    >
                      <div>
                        <span style={styles.repositoryLabel}>
                          REPOSITORY
                        </span>

                        <h3 style={styles.repository}>
                          {analysis.repository}
                        </h3>

                        <div style={styles.meta}>
                          <span
                            style={{
                              ...styles.status,
                              ...(analysis.status ===
                              "completed"
                                ? styles.completed
                                : analysis.status ===
                                    "failed"
                                  ? styles.failed
                                  : styles.running),
                            }}
                          >
                            {analysis.status}
                          </span>

                          <span>
                            {analysis.total_clusters}{" "}
                            {analysis.total_clusters === 1
                              ? "cluster"
                              : "clusters"}
                          </span>

                          <span>
                            {new Date(
                              analysis.created_at
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                     {analysis.status === "completed" && (
  <a
    href="/reports"
    style={styles.secondaryButton}
  >
    View Report
  </a>
)}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section style={styles.quickActions}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Quick Actions
                </h2>

                <p style={styles.sectionSubtitle}>
                  Jump directly into your next task.
                </p>
              </div>

              <div style={styles.actionGrid}>
                <a
                  href="/analysis"
                  style={styles.actionCard}
                >
                  <span style={styles.actionIcon}>＋</span>

                  <div>
                    <strong>Analyze Repository</strong>

                    <p>
                      Analyze GitHub issues and discover
                      recurring problems.
                    </p>
                  </div>
                </a>

                <a
                  href="/reports"
                  style={styles.actionCard}
                >
                  <span style={styles.actionIcon}>▤</span>

                  <div>
                    <strong>View Reports</strong>

                    <p>
                      Review previous analyses and product
                      opportunities.
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </>
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
    maxWidth: "720px",
    marginTop: "10px",
    color: "#64748b",
    lineHeight: 1.6,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "35px",
  },

  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    padding: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "13px",
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
  },

  statLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1px",
    color: "#94a3b8",
  },

  statNumber: {
    fontSize: "28px",
    color: "#2563eb",
  },

  statDescription: {
    fontSize: "12px",
    color: "#64748b",
  },

  section: {
    marginBottom: "35px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  viewAll: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: 650,
    textDecoration: "none",
  },

  analysisList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  analysisCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "19px 21px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(15, 23, 42, 0.03)",
  },

  repositoryLabel: {
    display: "block",
    marginBottom: "5px",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "1px",
    color: "#94a3b8",
  },

  repository: {
    margin: 0,
    fontSize: "17px",
  },

  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "8px",
    color: "#64748b",
    fontSize: "11px",
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

  failed: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  running: {
    background: "#fef3c7",
    color: "#92400e",
  },

  secondaryButton: {
    padding: "9px 14px",
    borderRadius: "8px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },

  empty: {
    padding: "45px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
  },

  primaryButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 16px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },

  quickActions: {
    paddingTop: "5px",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginTop: "18px",
  },

  actionCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    padding: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "13px",
    textDecoration: "none",
    color: "#172033",
  },

  actionIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "20px",
    fontWeight: 700,
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

  loading: {
    padding: "40px",
    textAlign: "center",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    color: "#64748b",
  },
};

export default Dashboard;