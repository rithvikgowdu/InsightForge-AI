import ComplaintDetails from "./ComplaintDetails";

const complaintDetails = {
  title: "Late Delivery",
  painScore: 8.7,
  mentions: 1284,
  growth: 42,
  summary:
    "Users frequently report delayed deliveries and inaccurate delivery estimates. Complaints often mention uncertainty around arrival times and a lack of timely updates when orders are delayed.",
  themes: [
    "Inaccurate ETA",
    "Delayed Orders",
    "No Delay Notification",
    "Poor Customer Support",
  ],
  complaints: [
    "I was told my order would arrive in 30 minutes, but it took more than an hour.",
    "The delivery estimate keeps changing and I have no idea when my order will actually arrive.",
    "There was no notification when my delivery was delayed.",
  ],
};

function ComplaintDetailsSection() {
  return (
    <section>

      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">
          Complaint Details
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          Understand the underlying themes and representative complaints
          behind the identified problem.
        </p>
      </div>

      <ComplaintDetails
        title={complaintDetails.title}
        painScore={complaintDetails.painScore}
        mentions={complaintDetails.mentions}
        growth={complaintDetails.growth}
        summary={complaintDetails.summary}
        themes={complaintDetails.themes}
        complaints={complaintDetails.complaints}
      />

    </section>
  );
}

export default ComplaintDetailsSection;