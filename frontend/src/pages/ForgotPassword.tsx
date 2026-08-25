import AuthLayout from "../components/auth/AuthLayout";

function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll help you reset your password."
    >
      <form className="space-y-5">

        <div>
          <label
            htmlFor="forgot-email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        <button
          type="button"
          className="w-full text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ← Back to Sign In
        </button>

      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;