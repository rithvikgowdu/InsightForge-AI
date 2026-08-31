import { useState } from "react";

function DangerZone() {
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    setConfirming(false);

    // Account deletion will be connected to the backend later.
  }

  return (
    <section className="rounded-xl border border-red-500/20 bg-slate-900 p-6 shadow-lg">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          These actions can permanently affect your account or data.
        </p>
      </div>

      <div className="space-y-4">

        <div className="flex flex-col gap-4 rounded-lg border border-red-500/10 bg-red-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-medium text-white">
              Delete account
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Permanently delete your InsightForge account and associated data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="w-fit rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/40"
          >
            Delete Account
          </button>

        </div>

      </div>


      {/* Confirmation */}
      {confirming && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 p-5"
        >
          <h3
            id="delete-account-title"
            className="font-semibold text-white"
          >
            Are you sure?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Account deletion is a permanent action. The actual
            deletion will only occur after the backend account
            deletion API is connected.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </section>
  );
}

export default DangerZone;