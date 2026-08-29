import AuthLayout from "../components/auth/AuthLayout";

function ResetPassword() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Create a new password for your InsightForge account."
    >
      <form
        className="space-y-5"
        aria-label="Reset password form"
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
            name="newPassword"
            type="password"
            placeholder="Enter a new password"
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Confirm Password */}
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
            placeholder="Confirm your new password"
            autoComplete="new-password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;