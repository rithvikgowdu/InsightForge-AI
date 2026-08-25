import Skeleton from "../ui/Skeleton";

function OpportunityCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <Skeleton className="mt-6 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-5/6" />
      <Skeleton className="mt-3 h-4 w-2/3" />

      <div className="mt-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-3 h-4 w-40" />
      </div>

    </div>
  );
}

export default OpportunityCardSkeleton;