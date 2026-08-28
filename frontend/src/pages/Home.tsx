import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

function Home() {
  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          InsightForge <span style={styles.logoAccent}>AI</span>
        </div>

        <div style={styles.navLinks}>
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>

          <Link to="/register" style={styles.registerButton}>
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              ✦ AI-Powered Repository Intelligence
            </div>

            <h1 style={styles.heroTitle}>
              Turn GitHub Issues Into
              <span style={styles.heroAccent}>
                {" "}
                Product Opportunities.
              </span>
            </h1>

            <p style={styles.heroText}>
              InsightForge AI analyzes repository issues, identifies
              recurring problems, and transforms them into actionable
              product opportunities using AI.
            </p>

            <div style={styles.heroActions}>
              <Link
                to="/register"
                style={styles.primaryButton}
              >
                Start Analyzing
              </Link>

              <Link
                to="/login"
                style={styles.secondaryButton}
              >
                Sign In
              </Link>
            </div>
          </div>

          <div style={styles.visual}>
            <div style={styles.visualCard}>
              <div style={styles.visualHeader}>
                <div>
                  <span style={styles.smallLabel}>
                    REPOSITORY ANALYSIS
                  </span>

                  <strong style={styles.repoName}>
                    microsoft / vscode
                  </strong>
                </div>

                <span style={styles.completed}>
                  Completed
                </span>
              </div>

              <div style={styles.stats}>
                <div style={styles.stat}>
                  <span>Issues</span>
                  <strong>20</strong>
                </div>

                <div style={styles.stat}>
                  <span>Clusters</span>
                  <strong>2</strong>
                </div>

                <div style={styles.stat}>
                  <span>Confidence</span>
                  <strong>80%</strong>
                </div>
              </div>

              <div style={styles.opportunity}>
                <span style={styles.opportunityIcon}>
                  💡
                </span>

                <div>
                  <span style={styles.smallLabel}>
                    PRODUCT OPPORTUNITY
                  </span>

                  <p style={styles.opportunityText}>
                    Automated issue tracking and prioritization
                  </p>
                </div>
              </div>

              <div style={styles.features}>
                <span>✓ Filtering</span>
                <span>✓ Prioritization</span>
                <span>✓ Labeling</span>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <div style={styles.sectionHeading}>
            <span style={styles.badge}>
              HOW IT WORKS
            </span>

            <h2 style={styles.sectionTitle}>
              From issues to insights in three steps.
            </h2>

            <p style={styles.sectionText}>
              Let AI do the heavy lifting while you focus on
              building the right product.
            </p>
          </div>

          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>01</div>

              <h3>Connect a Repository</h3>

              <p>
                Enter a GitHub repository and let InsightForge AI
                retrieve its issues.
              </p>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNumber}>02</div>

              <h3>Discover Patterns</h3>

              <p>
                AI cleans, embeds, and clusters related issues
                to uncover recurring problems.
              </p>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNumber}>03</div>

              <h3>Find Opportunities</h3>

              <p>
                Transform recurring complaints into product
                opportunities, solutions, and MVP ideas.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.cta}>
          <h2 style={styles.ctaTitle}>
            Ready to discover what users actually need?
          </h2>

          <p style={styles.ctaText}>
            Start analyzing your first repository with
            InsightForge AI.
          </p>

          <Link
            to="/register"
            style={styles.primaryButton}
          >
            Get Started
          </Link>
        </section>
      </main>

      <footer style={styles.footer}>
        <span>
          © 2026 InsightForge AI
        </span>

        <span>
          Repository intelligence powered by AI
        </span>
      </footer>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#172033",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 7%",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
  },

  logo: {
    fontSize: "21px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },

  logoAccent: {
    color: "#2563eb",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  loginLink: {
    color: "#475569",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },

  registerButton: {
    padding: "9px 15px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  hero: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    alignItems: "center",
    gap: "60px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "90px 32px 100px",
  },

  heroContent: {
    maxWidth: "650px",
  },

  badge: {
    display: "inline-block",
    padding: "7px 11px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.4px",
  },

  heroTitle: {
    margin: "20px 0 0",
    fontSize: "52px",
    lineHeight: 1.08,
    letterSpacing: "-2px",
    fontWeight: 800,
  },

  heroAccent: {
    color: "#2563eb",
  },

  heroText: {
    maxWidth: "590px",
    margin: "22px 0 0",
    fontSize: "17px",
    lineHeight: 1.7,
    color: "#64748b",
  },

  heroActions: {
    display: "flex",
    gap: "12px",
    marginTop: "30px",
  },

  primaryButton: {
    display: "inline-block",
    padding: "12px 19px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 19px",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
  },

  visual: {
    display: "flex",
    justifyContent: "center",
  },

  visualCard: {
    width: "100%",
    maxWidth: "470px",
    padding: "23px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.10)",
  },

  visualHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    paddingBottom: "18px",
    borderBottom: "1px solid #e2e8f0",
  },

  smallLabel: {
    display: "block",
    marginBottom: "5px",
    fontSize: "9px",
    fontWeight: 750,
    letterSpacing: "1px",
    color: "#94a3b8",
  },

  repoName: {
    fontSize: "16px",
  },

  completed: {
    padding: "5px 9px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "10px",
    fontWeight: 700,
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    margin: "18px 0",
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "9px",
  },

  opportunity: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "15px",
    background: "#eff6ff",
    border: "1px solid #dbeafe",
    borderRadius: "10px",
  },

  opportunityIcon: {
    fontSize: "20px",
  },

  opportunityText: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 650,
    lineHeight: 1.5,
  },

  features: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "15px",
  },

  featuresSection: {
    padding: "90px 32px",
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },

  sectionHeading: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },

  sectionTitle: {
    margin: "15px 0 0",
    fontSize: "32px",
    letterSpacing: "-1px",
  },

  sectionText: {
    margin: "10px 0 0",
    color: "#64748b",
    lineHeight: 1.6,
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
    maxWidth: "1050px",
    margin: "45px auto 0",
  },

  step: {
    padding: "25px",
    border: "1px solid #e2e8f0",
    borderRadius: "13px",
  },

  stepNumber: {
    marginBottom: "17px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1px",
  },

  cta: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "90px 32px",
    textAlign: "center",
  },

  ctaTitle: {
    margin: 0,
    fontSize: "32px",
    letterSpacing: "-1px",
  },

  ctaText: {
    margin: "12px 0 25px",
    color: "#64748b",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "22px 7%",
    background: "#172033",
    color: "#94a3b8",
    fontSize: "11px",
  },
};

export default Home;