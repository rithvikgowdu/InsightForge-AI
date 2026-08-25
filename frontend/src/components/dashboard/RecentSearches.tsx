import {
  FiChevronRight,
  FiClock,
} from "react-icons/fi";

const searches = [
  {
    title: "Food Delivery",
    source: "Reddit + GitHub",
    time: "2 hours ago",
  },
  {
    title: "Healthcare",
    source: "Reddit",
    time: "Yesterday",
  },
  {
    title: "EdTech",
    source: "Reddit + GitHub",
    time: "2 days ago",
  },
  {
    title: "Cybersecurity",
    source: "GitHub",
    time: "3 days ago",
  },
];

function RecentSearches() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-5">

        <h3 className="text-lg font-semibold text-white">
          Recent Searches
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Your recently analyzed industries.
        </p>

      </div>


      {/* Searches */}
      <div className="space-y-3">

        {searches.map((search) => (
          <button
            key={search.title}
            type="button"
            className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-4 text-left transition hover:bg-slate-700"
          >

            <div>

              <p className="font-medium text-white">
                {search.title}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

                <span>
                  {search.source}
                </span>

                <span>
                  •
                </span>

                <FiClock size={12} />

                <span>
                  {search.time}
                </span>

              </div>

            </div>


            <FiChevronRight
              size={18}
              className="text-slate-500"
            />

          </button>
        ))}

      </div>

    </div>
  );
}

export default RecentSearches;