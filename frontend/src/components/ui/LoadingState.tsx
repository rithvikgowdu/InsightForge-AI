import LoadingSpinner from "./LoadingSpinner";

type LoadingStateProps = {
  message?: string;
  minHeight?: string;
};

function LoadingState({
  message = "Loading...",
  minHeight = "min-h-[300px]",
}: LoadingStateProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center rounded-xl border border-slate-800 bg-slate-900`}
    >
      <LoadingSpinner
        size="lg"
        label={message}
      />
    </div>
  );
}

export default LoadingState;