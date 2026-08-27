import EmptyState from "../ui/EmptyState";

type NoRecentSearchesProps = {
  onSearch?: () => void;
};

function NoRecentSearches({
  onSearch,
}: NoRecentSearchesProps) {
  return (
    <EmptyState
      icon="⌕"
      title="No recent searches"
      message="Your recent industry searches will appear here after you run an analysis."
      actionLabel="Start a Search"
      onAction={onSearch}
    />
  );
}

export default NoRecentSearches;