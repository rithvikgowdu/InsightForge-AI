import SearchBar from "../components/dashboard/SearchBar";
import StatsCard from "../components/dashboard/StatsCard";
import ComplaintCard from "../components/dashboard/ComplaintCard";
import PainScoreCard from "../components/dashboard/PainScoreCard";
import TrendCard from "../components/dashboard/TrendCard";
import OpportunityScoreCard from "../components/dashboard/OpportunityScoreCard";
import FeatureRequestCard from "../components/dashboard/FeatureRequestCard";
import OpportunityCard from "../components/dashboard/OpportunityCard";
import RecentSearches from "../components/dashboard/RecentSearches";

function Dashboard() {
  const trendData = [
    { month: "May", mentions: 620 },
    { month: "Jun", mentions: 780 },
    { month: "Jul", mentions: 940 },
    { month: "Aug", mentions: 1284 },
  ];



  return (
    <div className="space-y-8">

      {/* Search */}
      <section>
        <SearchBar />
      </section>


      {/* Overview */}
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <StatsCard
            title="Total Analyses"
            value="325"
          />

          <StatsCard
            title="Opportunities"
            value="84"
          />

          <StatsCard
            title="Trending Topics"
            value="41"
          />

        </div>
      </section>


      {/* Customer Problems */}
      <section>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Top Customer Problems
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recurring problems discovered from user discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <ComplaintCard
            title="Late Delivery"
            mentions={1284}
            painScore={8.7}
            summary="Users frequently complain about delayed deliveries."
          />

          <PainScoreCard
            score={8.7}
          />

        </div>

      </section>


      {/* Emerging Trends */}
      <section>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Emerging Trends
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Track how frequently customer problems are mentioned over time.
          </p>
        </div>

        <TrendCard
          data={trendData}
        />

      </section>
      {/* Opportunity Intelligence */}
<section>
  <div className="mb-4">
    <h2 className="text-2xl font-semibold text-white">
      Opportunity Intelligence
    </h2>

    <p className="mt-1 text-sm text-slate-400">
      AI-generated assessment of the business potential behind a problem.
    </p>
  </div>

  <OpportunityScoreCard
    score={8.6}
    pain={8.7}
    frequency={8.4}
    growth={8.9}
    marketPotential={8.2}
    aiFit={9.1}
    confidence={8.5}
  />
</section>


      


      {/* Feature Requests */}
      <section>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Top Feature Requests
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Features users repeatedly request across discussions.
          </p>
        </div>

        <FeatureRequestCard
          title="Real-Time Delivery Tracking"
          mentions={734}
          description="Users want more accurate real-time information about their delivery status."
        />

      </section>


      {/* Product Opportunities */}
      <section>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Product Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI-generated opportunities based on recurring user problems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <OpportunityCard />

          <RecentSearches />

        </div>

      </section>
      
    </div>
  );
}

export default Dashboard;