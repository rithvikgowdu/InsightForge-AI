type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">
        {title}
      </h2>

      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
}

export default Card;