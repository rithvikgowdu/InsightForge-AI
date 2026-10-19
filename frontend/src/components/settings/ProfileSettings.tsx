
import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";
import { useAuth } from "../../context/AuthContext";

type Profile = {
  name: string;
  email: string;
  role: string;
};

const defaultProfile: Profile = {
  name: "",
  email: "",
  role: "",
};

function ProfileSettings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const storageKey = user
    ? `insightforge-profile-${user.id}`
    : null;

  useEffect(() => {
    setLoaded(false);
    setSaved(false);
    setError("");

    if (!user || !storageKey) {
      setProfile(defaultProfile);
      setLoaded(true);
      return;
    }

    const initialProfile: Profile = {
      ...defaultProfile,
      email:
        "email" in user && typeof user.email === "string"
          ? user.email
          : "",
    };

    try {
      const storedProfile = localStorage.getItem(storageKey);

      if (storedProfile) {
        const parsed: unknown = JSON.parse(storedProfile);

        if (typeof parsed === "object" && parsed !== null) {
          const data = parsed as Record<string, unknown>;

          setProfile({
            name:
              typeof data.name === "string"
                ? data.name
                : initialProfile.name,
            email:
              typeof data.email === "string"
                ? data.email
                : initialProfile.email,
            role:
              typeof data.role === "string"
                ? data.role
                : initialProfile.role,
          });
        } else {
          setProfile(initialProfile);
        }
      } else {
        setProfile(initialProfile);
      }
    } catch {
      setProfile(initialProfile);
      setError("Could not read the saved profile from this browser.");
    } finally {
      setLoaded(true);
    }
  }, [storageKey, user]);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  }

  function handleSave() {
    if (!storageKey) {
      setError("Please sign in before saving your profile.");
      return;
    }

    if (!profile.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!profile.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...profile,
          name: profile.name.trim(),
          email: profile.email.trim(),
          role: profile.role.trim(),
        })
      );

      setSaved(true);
      setError("");
    } catch {
      setSaved(false);
      setError("Unable to save the profile in this browser.");
    }
  }

  return (
    <SettingsSection
      title="Profile"
      description="Manage your profile details for this account in this browser."
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
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded || !user}
            required
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
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded || !user}
            required
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
            onChange={(event) =>
              updateField("role", event.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={!loaded || !user}
          />
        </div>

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
            Profile saved for this account in this browser.
          </p>
        )}

        <button
          type="submit"
          disabled={!loaded || !user}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Profile
        </button>
      </form>
    </SettingsSection>
  );
}

export default ProfileSettings;
