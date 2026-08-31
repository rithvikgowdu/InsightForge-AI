import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Button from "../ui/Button";

function SearchBar() {
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");

  function handleAnalyze() {
    if (!industry.trim()) {
      setMessage("Please enter an industry or topic to analyze.");
      return;
    }

    setMessage(
      `Analysis request ready for "${industry.trim()}".`
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">
          <label
            htmlFor="dashboard-search"
            className="sr-only"
          >
            Search an industry
          </label>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <FiSearch size={18} />
          </div>

          <input
            id="dashboard-search"
            name="industry"
            type="search"
            value={industry}
            onChange={(event) => {
              setIndustry(event.target.value);
              setMessage("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAnalyze();
              }
            }}
            placeholder="Search an industry (e.g., Food Delivery)"
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
              pl-10
              text-white
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-500
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/30
            "
          />
        </div>

        <Button
          type="button"
          onClick={handleAnalyze}
        >
          Analyze
        </Button>

      </div>

      {message && (
        <p
          role="status"
          className="text-sm text-slate-400"
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default SearchBar;