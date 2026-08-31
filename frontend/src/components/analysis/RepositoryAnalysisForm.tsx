import { useState } from "react";
import { startAnalysis, type Analysis } from "../../services/api";
import Button from "../ui/Button";

type RepositoryAnalysisFormProps = {
  onStarted?: (analysis: Analysis) => void;
};

function RepositoryAnalysisForm({
  onStarted,
}: RepositoryAnalysisFormProps) {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [limit, setLimit] = useState("20");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!owner.trim() || !repository.trim()) {
      setError(
        "Please enter both the repository owner and repository name."
      );
      return;
    }

    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      setError("Please enter a valid positive issue limit.");
      return;
    }

    setLoading(true);

    try {
      const analysis = await startAnalysis({
        owner: owner.trim(),
        repository: repository.trim(),
        limit: parsedLimit,
      });

      setSuccess(
        `Analysis started for ${analysis.repository}. Analysis ID: ${analysis.id}`
      );

      onStarted?.(analysis);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start the analysis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      aria-labelledby="repository-analysis-title"
      className="rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <div className="mb-6">
        <h2
          id="repository-analysis-title"
          className="text-lg font-semibold text-white"
        >
          Analyze a GitHub Repository
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Start an AI analysis of issues and discussions from a
          GitHub repository.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {/* Owner */}
        <div>
          <label
            htmlFor="repository-owner"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Repository owner
          </label>

          <input
            id="repository-owner"
            name="owner"
            type="text"
            value={owner}
            onChange={(event) => {
              setOwner(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="e.g. microsoft"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Repository */}
        <div>
          <label
            htmlFor="repository-name"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Repository
          </label>

          <input
            id="repository-name"
            name="repository"
            type="text"
            value={repository}
            onChange={(event) => {
              setRepository(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="e.g. vscode"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Limit */}
        <div>
          <label
            htmlFor="repository-limit"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Issue limit
          </label>

          <input
            id="repository-limit"
            name="limit"
            type="number"
            min="1"
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
              setError("");
              setSuccess("");
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Messages */}
        {(error || success) && (
          <div className="md:col-span-3">
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                {success}
              </p>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="md:col-span-3">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Starting Analysis..." : "Start Analysis"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default RepositoryAnalysisForm;