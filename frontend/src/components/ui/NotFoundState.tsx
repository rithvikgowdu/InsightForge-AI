type NotFoundStateProps = {
  title?: string;
  message?: string;
};

function NotFoundState({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or may have been moved.",
}: NotFoundStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

      <div className="text-7xl font-bold text-slate-800">
        404
      </div>

      <h1 className="mt-4 text-2xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      <button
        type="button"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Back to Dashboard
      </button>

    </div>
  );
}

export default NotFoundState;