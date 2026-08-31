import { useState } from "react";
import SettingsSection from "./SettingsSection";

function SecuritySettings() {
  const [message, setMessage] = useState("");

  function handlePasswordChange() {
    setMessage(
      "Password change will be available when the backend reset flow is connected."
    );
  }

  function handleTwoFactor() {
    setMessage(
      "Two-factor authentication setup will be available when the backend integration is connected."
    );
  }

  return (
    <SettingsSection
      title="Security"
      description="Manage your account security settings."
    >
      <div className="space-y-4">

        {/* Password */}
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
            onClick={handlePasswordChange}
            className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Change Password
          </button>

        </div>


        {/* Two-factor authentication */}
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
            onClick={handleTwoFactor}
            className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Set Up
          </button>

        </div>


        {/* Feedback */}
        {message && (
          <div
            role="status"
            className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-300"
          >
            {message}
          </div>
        )}

      </div>
    </SettingsSection>
  );
}

export default SecuritySettings;