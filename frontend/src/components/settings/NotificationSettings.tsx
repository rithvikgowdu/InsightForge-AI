import { useState } from "react";
import SettingsSection from "./SettingsSection";

function NotificationSettings() {
  const [opportunityAlerts, setOpportunityAlerts] = useState(true);
  const [trendAlerts, setTrendAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <SettingsSection
      title="Notifications"
      description="Choose which InsightForge updates you want to receive."
    >
      <div className="space-y-5">

        {/* Opportunity alerts */}
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              New opportunity alerts
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Get notified when important product opportunities are detected.
            </p>
          </div>

          <input
            type="checkbox"
            checked={opportunityAlerts}
            onChange={(event) => {
              setOpportunityAlerts(event.target.checked);
              setSaved(false);
            }}
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>


        {/* Trend alerts */}
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              Emerging trend alerts
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Receive alerts when important complaint or demand trends change.
            </p>
          </div>

          <input
            type="checkbox"
            checked={trendAlerts}
            onChange={(event) => {
              setTrendAlerts(event.target.checked);
              setSaved(false);
            }}
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>


        {/* Report alerts */}
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              Report notifications
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Receive notifications when an analysis report is ready.
            </p>
          </div>

          <input
            type="checkbox"
            checked={reportAlerts}
            onChange={(event) => {
              setReportAlerts(event.target.checked);
              setSaved(false);
            }}
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>


        {/* Feedback */}
        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Notification preferences saved locally for this session.
          </p>
        )}


        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Save Notifications
        </button>

      </div>
    </SettingsSection>
  );
}

export default NotificationSettings;