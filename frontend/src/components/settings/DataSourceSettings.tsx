import SettingsSection from "./SettingsSection";

function DataSourceSettings() {
  return (
    <SettingsSection
      title="Data Sources"
      description="Manage the sources used when analyzing customer discussions."
    >
      <div className="space-y-4">

        {/* Reddit */}
        <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">
              Reddit
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Analyze public discussions and customer complaints.
            </p>
          </div>

          <span
            role="status"
            className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
          >
            Connected
          </span>
        </div>


        {/* GitHub */}
        <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">
              GitHub
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Analyze issues and discussions from repositories.
            </p>
          </div>

          <span
            role="status"
            className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
          >
            Connected
          </span>
        </div>


        {/* Integration information */}
        <p className="pt-2 text-xs leading-5 text-slate-500">
          Source connections will be managed through the platform
          integration layer.
        </p>

      </div>
    </SettingsSection>
  );
}

export default DataSourceSettings;