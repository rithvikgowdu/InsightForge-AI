import AuthLayout from "../components/auth/AuthLayout";

function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your InsightForge workspace."
    >
      <form className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">

            <label
              htmlFor="login-password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <button
              type="button"
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Forgot password?
            </button>

          </div>

          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Remember */}
        <div className="flex items-center gap-3">

          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />

          <label
            htmlFor="remember"
            className="text-sm text-slate-400"
          >
            Remember me
          </label>

        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>


        {/* Register */}
        <p className="text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <button
            type="button"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Create an account
          </button>

        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;