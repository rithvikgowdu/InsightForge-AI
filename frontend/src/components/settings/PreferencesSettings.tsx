
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";

type Preferences = {
  source: string;
  timeRange: string;
};

const STORAGE_KEY = "insightforge-preferences";

const defaultPreferences: Preferences = {
  source: "github",
  timeRange: "30",
};

function PreferencesSettings() {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "source" in parsed &&
          "timeRange" in parsed &&
          typeof parsed.source === "string" &&
          ["all", "reddit", "github"].includes(parsed.source) &&
          typeof parsed.timeRange === "string" &&
          ["7", "30", "90"].includes(parsed.timeRange)
        ) {
          setPreferences({
            source: parsed.source,
            timeRange: parsed.timeRange,
          });
        }
      }
    } catch {
      // Keep defaults if saved preferences cannot be read.
    } finally {
      setLoaded(true);
    }
  }, []);

  function updatePreference(
    field: keyof Preferences,
    value: string
  ) {
    setPreferences((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSave() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences)
      );

      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  return (
    <SettingsSection
      title="Preferences"
      description="Customize your default analysis source and time range."
    >
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label
            htmlFor="default-source"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Default analysis source
          </label>

          <select
            id="default-source"
            value={preferences.source}
            onChange={(event) =>
              updatePreference("source", event.target.value)
            }
            disabled={!loaded}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
          >
            <option value="all">Reddit + GitHub</option>
            <option value="reddit">Reddit</option>
            <option value="github">GitHub</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="default-time-range"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Default time range
          </label>

          <select
            id="default-time-range"
            value={preferences.timeRange}
            onChange={(event) =>
              updatePreference("timeRange", event.target.value)
            }
            disabled={!loaded}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Preferences saved in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Preferences
        </button>
      </form>
    </SettingsSection>
  );
}

export default PreferencesSettings;
