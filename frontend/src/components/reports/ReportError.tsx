import ErrorState from "../ui/ErrorState";

type ReportErrorProps = {
  onRetry?: () => void;
};

function ReportError({
  onRetry,
}: ReportErrorProps) {
  return (
    <ErrorState
      title="Report couldn't be generated"
      message="The analysis results are currently unavailable. Please try again in a moment."
      actionLabel="Retry Report"
      onAction={onRetry}
    />
  );
}

export default ReportError;