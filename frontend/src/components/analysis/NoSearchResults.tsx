import EmptyState from "../ui/EmptyState";

type NoSearchResultsProps = {
  onClear?: () => void;
};

function NoSearchResults({
  onClear,
}: NoSearchResultsProps) {
  return (
    <EmptyState
      icon="⌕"
      title="No results found"
      message="We couldn't find any discussions matching your search. Try a different keyword or broaden your filters."
      actionLabel="Clear Search"
      onAction={onClear}
    />
  );
}

export default NoSearchResults;