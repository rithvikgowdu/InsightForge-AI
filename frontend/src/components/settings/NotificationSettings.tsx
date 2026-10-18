
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";

type NotificationPreferences = {
  opportunityAlerts: boolean;
  trendAlerts: boolean;
  reportAlerts: boolean;
};

const STORAGE_KEY = "insightforge-notifications";

const defaultPreferences: NotificationPreferences = {
  opportunityAlerts: true,
  trendAlerts: true,
  reportAlerts: true,
};

function NotificationSettings() {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(defaultPreferences);
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
          "opportunityAlerts" in parsed &&
          "trendAlerts" in parsed &&
          "reportAlerts" in parsed &&
          typeof parsed.opportunityAlerts === "boolean" &&
          typeof parsed.trendAlerts === "boolean" &&
          typeof parsed.reportAlerts === "boolean"
        ) {
          setPreferences({
            opportunityAlerts: parsed.opportunityAlerts,
            trendAlerts: parsed.trendAlerts,
            reportAlerts: parsed.reportAlerts,
          });
        }
      }
    } catch {
      // Use default preferences if saved data cannot be read.
    } finally {
      setLoaded(true);
    }
  }, []);

  function updatePreference(
    field: keyof NotificationPreferences,
    value: boolean
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
      title="Notifications"
      description="Choose your notification preferences for InsightForge."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              New opportunity alerts
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Enable your preference for new product opportunity alerts.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.opportunityAlerts}
            disabled={!loaded}
            onChange={(event) =>
              updatePreference("opportunityAlerts", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              Emerging trend alerts
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Enable your preference for important complaint or demand trend alerts.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.trendAlerts}
            disabled={!loaded}
            onChange={(event) =>
              updatePreference("trendAlerts", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex cursor-pointer items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">
              Report notifications
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Enable your preference for notifications when reports are ready.
            </p>
          </div>

          <input
            type="checkbox"
            checked={preferences.reportAlerts}
            disabled={!loaded}
            onChange={(event) =>
              updatePreference("reportAlerts", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>

        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Notification preferences saved in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Notifications
        </button>
      </form>
    </SettingsSection>
  );
}

export default NotificationSettings;
