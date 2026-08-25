

function DangerZone() {
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
            className="w-fit rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            Delete Account
          </button>

        </div>

      </div>

    </section>
  );
}

export default DangerZone;