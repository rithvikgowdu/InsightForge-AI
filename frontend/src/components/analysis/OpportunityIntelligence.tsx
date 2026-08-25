import OpportunityDetails from "./OpportunityDetails";

const opportunity = {
  title: "AI Delivery Optimization Platform",
  score: 8.6,
  problem:
    "Food delivery users frequently experience delayed orders and inaccurate delivery estimates. Repeated complaints indicate that customers lack visibility into when their orders will actually arrive.",
  whyNow:
    "Complaints about delivery delays are increasing, with mentions growing by 42% over the analyzed period. This indicates that the problem is becoming more important rather than remaining a static customer issue.",
  aiSolution:
    "An AI-powered delivery prediction system could combine historical order data, delivery patterns, location information, and traffic signals to predict delays and provide more accurate estimated arrival times.",
  targetUsers:
    "Food delivery companies, restaurant platforms, and logistics teams.",
  businessPotential: "High" as const,
  confidence: 8.5,
  mvpFeatures: [
    "Delivery delay prediction",
    "Real-time ETA estimation",
    "Customer delay notifications",
    "Delivery performance dashboard",
  ],
};

function OpportunityIntelligence() {
  return (
    <section>

      {/* Section Header */}
      <div className="mb-5">

        <h2 className="text-2xl font-semibold text-white">
          Opportunity Intelligence
        </h2>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
          AI-generated business opportunities based on customer pain,
          demand, emerging trends, and potential solutions.
        </p>

      </div>


      {/* Opportunity */}
      <OpportunityDetails
        title={opportunity.title}
        score={opportunity.score}
        problem={opportunity.problem}
        whyNow={opportunity.whyNow}
        aiSolution={opportunity.aiSolution}
        targetUsers={opportunity.targetUsers}
        businessPotential={opportunity.businessPotential}
        confidence={opportunity.confidence}
        mvpFeatures={opportunity.mvpFeatures}
      />

    </section>
  );
}

export default OpportunityIntelligence;