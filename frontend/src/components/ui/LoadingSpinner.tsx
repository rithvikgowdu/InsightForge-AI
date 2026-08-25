type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
};

function LoadingSpinner({
  size = "md",
  label = "Loading",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div
        role="status"
        aria-label={label}
        className={`${sizeClasses[size]} animate-spin rounded-full border-slate-700 border-t-blue-500`}
      />

      <span className="text-sm text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default LoadingSpinner;