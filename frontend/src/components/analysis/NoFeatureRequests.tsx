import EmptyState from "../ui/EmptyState";

function NoFeatureRequests() {
  return (
    <EmptyState
      icon="＋"
      title="No feature requests found"
      message="No meaningful feature requests were identified in the selected data."
    />
  );
}

export default NoFeatureRequests;