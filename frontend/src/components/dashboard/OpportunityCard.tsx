import Badge from "../ui/Badge";
import Card from "../ui/Card";

function OpportunityCard() {
  return (
    <Card title="AI Opportunity">
      <Badge>High Potential</Badge>

      <p className="mt-4">
        Subscription-based AI platform for restaurant
        inventory prediction.
      </p>
    </Card>
  );
}

export default OpportunityCard;