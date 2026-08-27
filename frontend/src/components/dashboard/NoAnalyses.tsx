import EmptyState from "../ui/EmptyState";

type NoAnalysesProps = {
  onAnalyze?: () => void;
};

function NoAnalyses({
  onAnalyze,
}: NoAnalysesProps) {
  return (
    <EmptyState
      icon="✦"
      title="No analyses yet"
      message="Start your first analysis to discover customer problems, trends, feature requests, and product opportunities."
      actionLabel="Start Analysis"
      onAction={onAnalyze}
    />
  );
}

export default NoAnalyses;