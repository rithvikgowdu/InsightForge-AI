import Skeleton from "../ui/Skeleton";

function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <Skeleton className="h-4 w-28" />

      <Skeleton className="mt-4 h-9 w-20" />

      <Skeleton className="mt-3 h-3 w-36" />
    </div>
  );
}

export default StatsCardSkeleton;