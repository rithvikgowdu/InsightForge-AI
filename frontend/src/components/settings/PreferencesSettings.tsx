
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";
import { useAuth } from "../../context/AuthContext";

type Preferences = {
  source: string;
  timeRange: string;
};

const defaultPreferences: Preferences = {
  source: "github",
  timeRange: "30",
};

const validSources = ["all", "reddit", "github"];
const validTimeRanges = ["7", "30", "90"];

function PreferencesSettings() {
  const { user } = useAuth();

  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const storageKey = user
    ? `insightforge-preferences-${user.id}`
    : null;

  useEffect(() => {
    setLoaded(false);
    setSaved(false);
    setError("");
    setPreferences(defaultPreferences);

    if (!storageKey) {
      setLoaded(true);
      return;
    }

    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (typeof parsed === "object" && parsed !== null) {
          const data = parsed as Record<string, unknown>;

          const source =
            typeof data.source === "string" &&
            validSources.includes(data.source)
              ? data.source
              : defaultPreferences.source;

          const timeRange =
            typeof data.timeRange === "string" &&
            validTimeRanges.includes(data.timeRange)
              ? data.timeRange
              : defaultPreferences.timeRange;

          setPreferences({ source, timeRange });
        }
      }
    } catch {
      setError(
        "Could not load saved preferences. You can select your preferences and save them again."
      );
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  function updatePreference(
    field: keyof Preferences,
    value: string
  ) {
    setPreferences((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  }

  function handleSave() {
    if (!storageKey) {
      setError("Please sign in before saving preferences.");
      return;
    }

    if (
      !validSources.includes(preferences.source) ||
      !validTimeRanges.includes(preferences.timeRange)
    ) {
      setError("Please select valid analysis preferences.");
      setSaved(false);
      return;
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(preferences)
      );

      setSaved(true);
      setError("");
    } catch {
      setSaved(false);
      setError(
        "Unable to save preferences in this browser. Check your browser storage settings."
      );
    }
  }

  return (
    <SettingsSection
      title="Preferences"
      description="Customize your default analysis source and time range. These settings are saved in this browser."
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
            disabled={!loaded || !user}
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
            disabled={!loaded || !user}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Preferences saved for this account in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded || !user}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Preferences
        </button>
      </form>
    </SettingsSection>
  );
}

export default PreferencesSettings;
