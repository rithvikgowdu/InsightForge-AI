import Skeleton from "../ui/Skeleton";

function ReportSkeleton() {
  return (
    <div className="space-y-8">

      {/* Report header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <Skeleton className="h-4 w-40" />

        <Skeleton className="mt-4 h-8 w-80" />

        <Skeleton className="mt-3 h-4 w-64" />

      </div>


      {/* Summary */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <Skeleton className="h-6 w-48" />

        <Skeleton className="mt-5 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
        <Skeleton className="mt-3 h-4 w-4/6" />

      </div>


      {/* Findings */}
      <div>

        <Skeleton className="h-6 w-40" />

        <div className="mt-5 space-y-4">

          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />

        </div>

      </div>


      {/* Problems */}
      <div>

        <Skeleton className="h-6 w-48" />

        <Skeleton className="mt-5 h-64 w-full rounded-xl" />

      </div>


      {/* Opportunities */}
      <div>

        <Skeleton className="h-6 w-52" />

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />

        </div>

      </div>

    </div>
  );
}

export default ReportSkeleton;