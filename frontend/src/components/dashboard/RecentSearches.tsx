import Card from "../ui/Card";

const searches = [
  "Food Delivery",
  "Healthcare",
  "EdTech",
  "Cybersecurity",
];

function RecentSearches() {
  return (
    <Card title="Recent Searches">
      <ul className="space-y-3">
        {searches.map((search) => (
          <li
            key={search}
            className="rounded-lg bg-slate-800 px-4 py-3 text-white"
          >
            {search}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default RecentSearches;