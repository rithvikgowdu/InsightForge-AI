import OpportunityCard from "../components/dashboard/OpportunityCard";
import RecentSearches from "../components/dashboard/RecentSearches";
import SearchBar from "../components/dashboard/SearchBar";
import StatsCard from "../components/dashboard/StatsCard";

function Dashboard() {
  return (
    <>
      <SearchBar />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard title="Total Analyses" value="325" />
        <StatsCard title="Opportunities" value="84" />
        <StatsCard title="Trending Topics" value="41" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpportunityCard />
        <RecentSearches />
      </div>
    </>
  );
}

export default Dashboard;