import EmptyState from "../ui/EmptyState";

function NoTrends() {
  return (
    <EmptyState
      icon="↗"
      title="No emerging trends"
      message="There isn't enough change in discussion volume to identify an emerging trend yet."
    />
  );
}

export default NoTrends;