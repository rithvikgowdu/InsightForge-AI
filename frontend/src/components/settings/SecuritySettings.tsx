import SettingsSection from "./SettingsSection";

function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Manage your account security settings."
    >
      <div className="space-y-4">

        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-medium text-white">
              Password
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Last changed recently.
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Change Password
          </button>

        </div>


        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-medium text-white">
              Two-factor authentication
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Add an additional layer of protection to your account.
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Set Up
          </button>

        </div>

      </div>
    </SettingsSection>
  );
}

export default SecuritySettings;