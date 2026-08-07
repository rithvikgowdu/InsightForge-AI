type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white",
  };

  return (
    <button
      className={`rounded-xl px-5 py-2 transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;