import { FiTrendingUp } from "react-icons/fi";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

function OpportunityCard() {
  return (
    <Card title="AI Opportunity">
      <div className="flex items-center gap-2">
        <FiTrendingUp className="text-green-400" />
        <Badge>High Potential</Badge>
      </div>

      <p className="mt-4 text-slate-300">
        Build an AI assistant that predicts restaurant inventory
        requirements using historical sales data.
      </p>
    </Card>
  );
}

export default OpportunityCard;