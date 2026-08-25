import SettingsSection from "./SettingsSection";

function ProfileSettings() {
  return (
    <SettingsSection
      title="Profile"
      description="Manage the information associated with your InsightForge account."
    >
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Full name
          </label>

          <input
            id="profile-name"
            type="text"
            defaultValue="Yashu"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <input
            id="profile-email"
            type="email"
            defaultValue="you@example.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="profile-role"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Role
          </label>

          <input
            id="profile-role"
            type="text"
            defaultValue="Product Explorer"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save Profile
        </button>

      </div>
    </SettingsSection>
  );
}

export default ProfileSettings;