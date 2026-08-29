import SettingsSection from "./SettingsSection";

function NotificationSettings() {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose which InsightForge updates you want to receive."
    >
      <div className="space-y-5">

        {/* Opportunity alerts */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <label
              htmlFor="opportunity-alerts"
              className="cursor-pointer text-sm font-medium text-white"
            >
              New opportunity alerts
            </label>

            <p className="mt-1 text-sm text-slate-400">
              Get notified when important product opportunities are detected.
            </p>
          </div>

          <input
            id="opportunity-alerts"
            name="opportunityAlerts"
            type="checkbox"
            defaultChecked
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>


        {/* Trend alerts */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <label
              htmlFor="trend-alerts"
              className="cursor-pointer text-sm font-medium text-white"
            >
              Emerging trend alerts
            </label>

            <p className="mt-1 text-sm text-slate-400">
              Receive alerts when important complaint or demand trends change.
            </p>
          </div>

          <input
            id="trend-alerts"
            name="trendAlerts"
            type="checkbox"
            defaultChecked
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>


        {/* Report alerts */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <label
              htmlFor="report-alerts"
              className="cursor-pointer text-sm font-medium text-white"
            >
              Report notifications
            </label>

            <p className="mt-1 text-sm text-slate-400">
              Receive notifications when an analysis report is ready.
            </p>
          </div>

          <input
            id="report-alerts"
            name="reportAlerts"
            type="checkbox"
            defaultChecked
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>


        {/* Save */}
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Save Notifications
        </button>

      </div>
    </SettingsSection>
  );
}

export default NotificationSettings;