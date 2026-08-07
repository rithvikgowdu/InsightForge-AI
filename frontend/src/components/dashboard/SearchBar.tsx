import { FiSearch } from "react-icons/fi";
import Button from "../ui/Button";
import Input from "../ui/Input";

function SearchBar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <FiSearch size={18} />
        </div>

        <div className="pl-10">
          <Input placeholder="Search an industry (e.g., Food Delivery)" />
        </div>
      </div>

      <Button>Analyze</Button>
    </div>
  );
}

export default SearchBar;