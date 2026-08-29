import ProfileSettings from "../components/settings/ProfileSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import DataSourceSettings from "../components/settings/DataSourceSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import DangerZone from "../components/settings/DangerZone";

function Settings() {
  return (
    <main className="w-full min-w-0 space-y-8">

      {/* Header */}
      <section aria-labelledby="settings-title">
        <p className="text-sm font-medium text-blue-400">
          Workspace
        </p>

        <h1
          id="settings-title"
          className="mt-2 text-3xl font-bold text-white"
        >
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Manage your profile, preferences, data sources, notifications,
          and account security.
        </p>
      </section>


      {/* Profile */}
      <section aria-label="Profile settings">
        <ProfileSettings />
      </section>


      {/* Preferences */}
      <section aria-label="Preference settings">
        <PreferencesSettings />
      </section>


      {/* Notifications */}
      <section aria-label="Notification settings">
        <NotificationSettings />
      </section>


      {/* Data Sources */}
      <section aria-label="Data source settings">
        <DataSourceSettings />
      </section>


      {/* Security */}
      <section aria-label="Security settings">
        <SecuritySettings />
      </section>


      {/* Danger Zone */}
      <section aria-label="Danger zone">
        <DangerZone />
      </section>

    </main>
  );
}

export default Settings;