import { useState } from "react";
import SettingsSection from "./SettingsSection";

function ProfileSettings() {
  const [name, setName] = useState("Yashu");
  const [email, setEmail] = useState("you@example.com");
  const [role, setRole] = useState("Product Explorer");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Feedback */}
        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Profile changes saved locally for this session.
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Save Profile
        </button>

      </div>
    </SettingsSection>
  );
}

export default ProfileSettings;