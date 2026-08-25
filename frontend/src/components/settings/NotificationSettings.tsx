import SettingsSection from "./SettingsSection";

function NotificationSettings() {
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
            defaultChecked
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
            defaultChecked
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
            defaultChecked
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>


        <button
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save Notifications
        </button>

      </div>
    </SettingsSection>
  );
}

export default NotificationSettings;