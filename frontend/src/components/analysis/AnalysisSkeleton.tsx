import Skeleton from "../ui/Skeleton";

function AnalysisSkeleton() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-9 w-40" />
        <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      </div>


      {/* Search */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <Skeleton className="h-11 w-full" />
      </div>


      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-8 w-16" />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-8 w-16" />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-8 w-16" />
        </div>

      </div>


      {/* Main analysis */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <Skeleton className="h-6 w-48" />

        <Skeleton className="mt-6 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
        <Skeleton className="mt-3 h-4 w-4/6" />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />

        </div>

      </div>


      {/* Lower cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />

      </div>

    </div>
  );
}

export default AnalysisSkeleton;