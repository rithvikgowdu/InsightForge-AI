import ProfileSettings from "../components/settings/ProfileSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import DataSourceSettings from "../components/settings/DataSourceSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import DangerZone from "../components/settings/DangerZone";

function Settings() {
  return (
    <div className="w-full min-w-0 space-y-8">

      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-400">
          Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Manage your profile, preferences, data sources, notifications,
          and account security.
        </p>
      </section>


      {/* Profile */}
      <ProfileSettings />


      {/* Preferences */}
      <PreferencesSettings />


      {/* Notifications */}
      <NotificationSettings />


      {/* Data Sources */}
      <DataSourceSettings />


      {/* Security */}
      <SecuritySettings />


      {/* Danger Zone */}
      <DangerZone />

    </div>
  );
}

export default Settings;