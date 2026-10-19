
import { useState } from "react";
import SettingsSection from "./SettingsSection";

type SecurityMessage = {
  title: string;
  description: string;
};

function SecuritySettings() {
  const [message, setMessage] = useState<SecurityMessage | null>(null);

  function handlePasswordChange() {
    setMessage({
      title: "Password change unavailable",
      description:
        "Password changes have not been implemented yet. A secure backend password-change flow is required before you can change your password here.",
    });
  }

  function handleTwoFactor() {
    setMessage({
      title: "Two-factor authentication unavailable",
      description:
        "Two-factor authentication is not configured. Backend support and a verification flow are required before this feature can be enabled.",
    });
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

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Your account uses the password configured during registration.
              Password changes are not currently available in this page.
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

            <p className="mt-1 text-sm leading-6 text-slate-400">
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
            aria-live="polite"
            className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3"
          >
            <p className="text-sm font-medium text-blue-300">
              {message.title}
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-300">
              {message.description}
            </p>
          </div>
        )}

        <p className="text-xs leading-5 text-slate-500">
          These buttons display informational messages only. They do not
          change your password or enable two-factor authentication.
          Security changes must be implemented and enforced by the backend.
        </p>
      </div>
    </SettingsSection>
  );
}

export default SecuritySettings;
