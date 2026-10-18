
import { useState } from "react";
import SettingsSection from "./SettingsSection";

function DataSourceSettings() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SettingsSection
      title="Data Sources"
      description="View the current integration status for InsightForge AI."
    >
      <div className="space-y-4">
        {/* GitHub */}
        <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">GitHub</p>
            <p className="mt-1 text-sm text-slate-400">
              Analyze issues and discussions from repositories.
            </p>
          </div>

          <span
            role="status"
            className="w-fit rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400"
          >
            Setup pending
          </span>
        </div>

        {/* Reddit */}
        <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">Reddit</p>
            <p className="mt-1 text-sm text-slate-400">
              Analyze public discussions and customer complaints.
            </p>
          </div>

          <span
            role="status"
            className="w-fit rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400"
          >
            Not integrated
          </span>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={() => setShowDetails((current) => !current)}
            aria-expanded={showDetails}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            {showDetails ? "Hide integration details" : "View integration details"}
          </button>

          {showDetails && (
            <div className="mt-3 rounded-lg bg-slate-950 p-4">
              <p className="text-sm leading-6 text-slate-400">
                GitHub analysis endpoints are available, but successful
                repository analysis requires completing the GitHub token
                configuration and verifying the end-to-end workflow.
                Reddit integration has not been implemented yet.
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                API credentials should be configured securely in the
                backend environment, never entered into this page or
                exposed in frontend code.
              </p>
            </div>
          )}
        </div>
      </div>
    </SettingsSection>
  );
}

export default DataSourceSettings;
