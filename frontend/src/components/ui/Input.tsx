import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        transition-all
        duration-200
        placeholder:text-slate-500
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    />
  );
}

export default Input;