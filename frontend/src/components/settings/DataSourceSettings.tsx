
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
        <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">GitHub</p>
            <p className="mt-1 text-sm text-slate-400">
              Analyze repository issues and discussions using the
              configured backend integration.
            </p>
          </div>

          <span
            role="status"
            className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
          >
            Integrated
          </span>
        </div>

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
            {showDetails
              ? "Hide integration details"
              : "View integration details"}
          </button>

          {showDetails && (
            <div className="mt-3 rounded-lg bg-slate-950 p-4">
              <p className="text-sm leading-6 text-slate-400">
                GitHub repository analysis is connected to the backend.
                Analysis results depend on repository accessibility,
                API credentials, and successful processing.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Reddit data collection is not currently integrated.
                The Reddit source preference does not itself enable
                Reddit analysis.
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Keep API tokens and other credentials in the backend
                environment. Never expose secrets in frontend code.
              </p>
            </div>
          )}
        </div>
      </div>
    </SettingsSection>
  );
}

export default DataSourceSettings;
