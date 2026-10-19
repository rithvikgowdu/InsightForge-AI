
import { Link } from "react-router-dom";

function Help() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          Support
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Help Center
        </h1>
        <p className="mt-2 text-slate-400">
          Find guidance for using InsightForge AI.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Getting started
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Use the Dashboard to view your analysis summaries and
          opportunities. Open Analysis to submit a repository for
          analysis, and Reports to review completed analyses.
        </p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          Go to Dashboard →
        </Link>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Data sources
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          GitHub analysis requires valid backend credentials and a
          working analysis pipeline. Reddit integration is not
          currently available.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          Account and settings
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Manage your profile, analysis preferences, and notification
          preferences in Settings. Password changes and two-factor
          authentication are not currently supported here.
        </p>
        <Link
          to="/settings"
          className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          Open Settings →
        </Link>
      </div>
    </div>
  );
}

export default Help;
