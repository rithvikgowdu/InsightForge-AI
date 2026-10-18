
import { useState } from "react";
import SettingsSection from "./SettingsSection";

function SecuritySettings() {
  const [message, setMessage] = useState("");

  function handlePasswordChange() {
    setMessage(
      "Password changes are not available yet. The backend password-change flow still needs to be implemented."
    );
  }

  function handleTwoFactor() {
    setMessage(
      "Two-factor authentication is not configured. Backend support is required before this feature can be enabled."
    );
  }

  return (
    <SettingsSection
      title="Security"
      description="Review your account security and available security features."
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">Password</p>

            <p className="mt-1 text-sm text-slate-400">
              Your account uses the password configured during registration.
              Password changes are not currently available here.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePasswordChange}
            className="w-fit shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
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
              Additional account verification is not currently configured.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTwoFactor}
            className="w-fit shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            View Status
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm leading-6 text-blue-300"
          >
            {message}
          </div>
        )}

        <p className="text-xs leading-5 text-slate-500">
          Security changes must be enforced by the backend. This page does
          not change your password or enable two-factor authentication.
        </p>
      </div>
    </SettingsSection>
  );
}

export default SecuritySettings;
