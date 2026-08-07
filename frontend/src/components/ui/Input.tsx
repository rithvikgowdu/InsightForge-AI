type InputProps = {
  placeholder?: string;
  type?: string;
};

function Input({
  placeholder = "",
  type = "text",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        transition
        placeholder:text-slate-500
        focus:border-blue-500
      "
    />
  );
}

export default Input;