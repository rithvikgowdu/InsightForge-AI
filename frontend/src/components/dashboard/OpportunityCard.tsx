import {
  FiArrowUpRight,
  FiCpu,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

function OpportunityCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm text-slate-400">
            Startup Opportunity
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            AI Delivery Optimization Platform
          </h3>
        </div>

        <span className="whitespace-nowrap rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
          High Potential
        </span>

      </div>


      {/* Problem */}
      <div className="mt-6">

        <div className="flex items-center gap-2">

          <FiTarget className="text-red-400" />

          <h4 className="font-medium text-white">
            Problem
          </h4>

        </div>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Food delivery users frequently experience late
          deliveries and inaccurate delivery estimates.
        </p>

      </div>


      {/* AI Solution */}
      <div className="mt-5">

        <div className="flex items-center gap-2">

          <FiCpu className="text-blue-400" />

          <h4 className="font-medium text-white">
            AI Solution
          </h4>

        </div>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Predict delivery delays using historical order,
          location, and traffic patterns.
        </p>

      </div>


      {/* Target Users */}
      <div className="mt-5">

        <div className="flex items-center gap-2">

          <FiUsers className="text-purple-400" />

          <h4 className="font-medium text-white">
            Target Users
          </h4>

        </div>

        <p className="mt-2 text-sm text-slate-400">
          Food delivery companies and restaurant platforms.
        </p>

      </div>


      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">

        <div>

          <p className="text-xs text-slate-500">
            Opportunity Score
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            8.6
            <span className="ml-1 text-sm text-slate-500">
              /10
            </span>
          </p>

        </div>


        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View Opportunity

          <FiArrowUpRight size={16} />

        </button>

      </div>

    </div>
  );
}

export default OpportunityCard;