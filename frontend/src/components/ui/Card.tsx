import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`
        rounded-xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-lg
        ${className}
      `}
    >
      <h2 className="mb-4 text-xl font-semibold text-white">
        {title}
      </h2>

      <div className="text-slate-300">
        {children}
      </div>
    </section>
  );
}

export default Card;