
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";
import { useAuth } from "../../context/AuthContext";

type NotificationPreferences = {
  opportunityAlerts: boolean;
  trendAlerts: boolean;
  reportAlerts: boolean;
};

const defaultPreferences: NotificationPreferences = {
  opportunityAlerts: true,
  trendAlerts: true,
  reportAlerts: true,
};

function NotificationSettings() {
  const { user } = useAuth();

  const [preferences, setPreferences] =
    useState<NotificationPreferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const storageKey = user
    ? `insightforge-notifications-${user.id}`
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

          setPreferences({
            opportunityAlerts:
              typeof data.opportunityAlerts === "boolean"
                ? data.opportunityAlerts
                : defaultPreferences.opportunityAlerts,
            trendAlerts:
              typeof data.trendAlerts === "boolean"
                ? data.trendAlerts
                : defaultPreferences.trendAlerts,
            reportAlerts:
              typeof data.reportAlerts === "boolean"
                ? data.reportAlerts
                : defaultPreferences.reportAlerts,
          });
        }
      }
    } catch {
      setError(
        "Could not load saved notification preferences. You can select your options and save again."
      );
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  function updatePreference(
    field: keyof NotificationPreferences,
    value: boolean
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
      setError("Please sign in before saving notification preferences.");
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
        "Unable to save notification preferences in this browser."
      );
    }
  }

  return (
    <SettingsSection
      title="Notifications"
      description="Choose your notification preferences for InsightForge. These preferences are saved in this browser."
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
            disabled={!loaded || !user}
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
            disabled={!loaded || !user}
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
            disabled={!loaded || !user}
            onChange={(event) =>
              updatePreference("reportAlerts", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
        </label>

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
            Notification preferences saved for this account in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded || !user}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Notifications
        </button>
      </form>
    </SettingsSection>
  );
}

export default NotificationSettings;
