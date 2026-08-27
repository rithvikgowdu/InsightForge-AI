import ErrorState from "../ui/ErrorState";

type AnalysisErrorProps = {
  onRetry?: () => void;
};

function AnalysisError({
  onRetry,
}: AnalysisErrorProps) {
  return (
    <ErrorState
      title="Analysis couldn't be completed"
      message="We weren't able to analyze the selected data. Please try again or check whether the selected data source is available."
      actionLabel="Retry Analysis"
      onAction={onRetry}
    />
  );
}

export default AnalysisError;