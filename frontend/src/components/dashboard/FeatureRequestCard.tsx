type FeatureRequestCardProps = {
  title: string;
  mentions: number;
  description: string;
};

function FeatureRequestCard({
  title,
  mentions,
  description,
}: FeatureRequestCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {description}
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
          Feature Request
        </span>
      </div>

      <div className="mt-5 text-sm text-slate-400">
        Requested by{" "}
        <span className="font-semibold text-white">
          {mentions.toLocaleString()}
        </span>{" "}
        mentions
      </div>
    </div>
  );
}

export default FeatureRequestCard;