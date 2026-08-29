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
            name="name"
            type="text"
            defaultValue="Yashu"
            autoComplete="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
            name="email"
            type="email"
            defaultValue="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
            name="role"
            type="text"
            defaultValue="Product Explorer"
            autoComplete="organization-title"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Save Profile
        </button>

      </div>
    </SettingsSection>
  );
}

export default ProfileSettings;