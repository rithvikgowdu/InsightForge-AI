import AuthLayout from "../components/auth/AuthLayout";

function Register() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start discovering product opportunities with InsightForge AI."
    >
      <form className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Full name
          </label>

          <input
            id="register-name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Confirm password
          </label>

          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>


        {/* Terms */}
        <div className="flex items-start gap-3">

          <input
            id="terms"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />

          <label
            htmlFor="terms"
            className="text-sm leading-5 text-slate-400"
          >
            I agree to the terms of service and privacy policy.
          </label>

        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Create Account
        </button>


        {/* Login */}
        <p className="text-center text-sm text-slate-400">

          Already have an account?{" "}

          <button
            type="button"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Sign in
          </button>

        </p>

      </form>
    </AuthLayout>
  );
}

export default Register;