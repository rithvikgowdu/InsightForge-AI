type ErrorStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  actionLabel = "Try Again",
  onAction,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-red-500/20 bg-slate-900 px-6 py-10 text-center"
    >
      {/* Error icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <span className="text-xl font-bold text-red-400">
          !
        </span>
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;