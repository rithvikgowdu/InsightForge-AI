import AuthLayout from "../components/auth/AuthLayout";

function ResetPassword() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Create a new password for your InsightForge account."
    >
      <form className="space-y-5">

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
            type="password"
            placeholder="Enter a new password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
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
            type="password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Reset Password
        </button>

      </form>
    </AuthLayout>
  );
}

export default ResetPassword;