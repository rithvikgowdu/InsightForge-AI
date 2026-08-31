import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Password reset API is not available in the current backend.
    // Keep the form ready for backend integration.
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll help you reset your password."
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >

        <div>
          <label
            htmlFor="forgot-email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <input
            id="forgot-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Send Reset Link
        </button>

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

export default ForgotPassword;