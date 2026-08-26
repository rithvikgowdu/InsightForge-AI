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

function Analysis() {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [limit, setLimit] = useState(20);

  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
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
      }
    };

    loadLatestAnalysis();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  return (
    <DashboardLayout>
      <div>
        <h1>Repository Analysis</h1>

        <p>
          Analyze GitHub issues to discover recurring problems and product
          opportunities.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="owner">GitHub Owner</label>

            <input
              id="owner"
              type="text"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              placeholder="e.g. microsoft"
              required
            />
          </div>

          <div>
            <label htmlFor="repository">Repository</label>

            <input
              id="repository"
              type="text"
              value={repository}
              onChange={(event) => setRepository(event.target.value)}
              placeholder="e.g. vscode"
              required
            />
          </div>

          <div>
            <label htmlFor="limit">Issues to analyze</label>

            <input
              id="limit"
              type="number"
              min="1"
              max="100"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Repository"}
          </button>
        </form>

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        {result && (
          <section>
            <h2>Analysis Results</h2>

            <p>
              Repository: {result.repository}
            </p>

            <p>
              Status: {result.status}
            </p>

            <p>
              Total Clusters: {result.total_clusters}
            </p>

            <h3>Clusters</h3>

            {clusters.map((cluster) => (
              <article key={cluster.cluster}>
                <h4>Cluster {cluster.cluster}</h4>

                <p>
                  Documents: {cluster.documents}
                </p>

                <p>
                  Summary: {cluster.summary}
                </p>

                <h5>Opportunity</h5>

                <pre>
                  {JSON.stringify(cluster.opportunity, null, 2)}
                </pre>
              </article>
            ))}
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Analysis;