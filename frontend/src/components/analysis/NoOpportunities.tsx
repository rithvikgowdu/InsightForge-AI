import EmptyState from "../ui/EmptyState";

function NoOpportunities() {
  return (
    <EmptyState
      icon="◇"
      title="No opportunities found"
      message="There aren't enough signals to identify a strong product opportunity yet. Try analyzing more customer discussions."
    />
  );
}

export default NoOpportunities;