import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Password reset API is not available in the current backend.
    // Keep the form ready for backend integration.
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Create a new password for your InsightForge account."
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >

        {/* New Password */}
        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            New password
          </label>

          <input
            id="new-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter a new password"
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>


        {/* Confirm */}
        <div>
          <label
            htmlFor="reset-confirm-password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Confirm new password
          </label>

          <input
            id="reset-confirm-password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder="Confirm your new password"
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>


        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}


        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Reset Password
        </button>


        {/* Back to Login */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full rounded-lg py-2 text-sm font-medium text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          ← Back to Sign In
        </button>

      </form>
    </AuthLayout>
  );
}

export default ResetPassword;