import EmptyState from "../ui/EmptyState";

type NoReportsProps = {
  onCreate?: () => void;
};

function NoReports({
  onCreate,
}: NoReportsProps) {
  return (
    <EmptyState
      icon="▤"
      title="No reports available"
      message="Completed analysis reports will appear here once you run your first analysis."
      actionLabel="Create Report"
      onAction={onCreate}
    />
  );
}

export default NoReports;