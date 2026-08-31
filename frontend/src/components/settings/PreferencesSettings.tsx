import { useState } from "react";
import SettingsSection from "./SettingsSection";

function PreferencesSettings() {
  const [source, setSource] = useState("all");
  const [timeRange, setTimeRange] = useState("30");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <SettingsSection
      title="Preferences"
      description="Customize how InsightForge presents your analysis results."
    >
      <div className="space-y-6">

        {/* Default source */}
        <div>
          <label
            htmlFor="default-source"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Default analysis source
          </label>

          <select
            id="default-source"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="all">
              Reddit + GitHub
            </option>

            <option value="reddit">
              Reddit
            </option>

            <option value="github">
              GitHub
            </option>
          </select>
        </div>


        {/* Default time range */}
        <div>
          <label
            htmlFor="default-time-range"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Default time range
          </label>

          <select
            id="default-time-range"
            value={timeRange}
            onChange={(event) => {
              setTimeRange(event.target.value);
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="7">
              Last 7 days
            </option>

            <option value="30">
              Last 30 days
            </option>

            <option value="90">
              Last 90 days
            </option>
          </select>
        </div>


        {/* Feedback */}
        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Preferences saved locally for this session.
          </p>
        )}


        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Save Preferences
        </button>

      </div>
    </SettingsSection>
  );
}

export default PreferencesSettings;