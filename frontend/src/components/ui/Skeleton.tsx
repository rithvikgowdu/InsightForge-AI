type SkeletonProps = {
  className?: string;
};

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-slate-800 ${className}`}
    />
  );
}

export default Skeleton;