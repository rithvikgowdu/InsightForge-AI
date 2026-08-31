import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      await login({
        username: username.trim(),
        password,
      });

      await refreshUser();

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your InsightForge workspace."
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >

        {/* Username */}
        <div>
          <label
            htmlFor="login-username"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Username
          </label>

          <input
            id="login-username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
            placeholder="Your username"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
              onClick={() =>
                navigate("/forgot-password")
              }
              className="rounded text-sm font-medium text-blue-400 transition hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              Forgot password?
            </button>

          </div>

          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>


        {/* Register */}
        <p className="text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="rounded font-medium text-blue-400 transition hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            Create an account
          </button>

        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;