type InlineErrorProps = {
  message: string;
};

function InlineError({
  message,
}: InlineErrorProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
        <span className="text-sm font-bold text-red-400">
          !
        </span>
      </div>

      <p className="text-sm leading-6 text-red-300">
        {message}
      </p>
    </div>
  );
}

export default InlineError;