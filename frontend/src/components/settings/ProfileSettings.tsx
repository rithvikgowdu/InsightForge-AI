
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";

type Profile = {
  name: string;
  email: string;
  role: string;
};

const STORAGE_KEY = "insightforge-profile";

const defaultProfile: Profile = {
  name: "",
  email: "",
  role: "",
};

function ProfileSettings() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEY);

      if (storedProfile) {
        const parsed: unknown = JSON.parse(storedProfile);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "name" in parsed &&
          "email" in parsed &&
          "role" in parsed &&
          typeof parsed.name === "string" &&
          typeof parsed.email === "string" &&
          typeof parsed.role === "string"
        ) {
          setProfile({
            name: parsed.name,
            email: parsed.email,
            role: parsed.role,
          });
        }
      }
    } catch {
      // Keep the default profile if stored data is unavailable.
    } finally {
      setLoaded(true);
    }
  }, []);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  return (
    <SettingsSection
      title="Profile"
      description="Manage your profile details for this browser."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
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
            autoComplete="name"
            value={profile.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded}
          />
        </div>

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
            autoComplete="email"
            value={profile.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded}
          />
        </div>

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
            value={profile.role}
            onChange={(event) => updateField("role", event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded}
          />
        </div>

        {saved && (
          <p
            role="status"
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            Profile saved in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Profile
        </button>
      </form>
    </SettingsSection>
  );
}

export default ProfileSettings;
