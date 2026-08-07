import Input from "../ui/Input";
import Button from "../ui/Button";

function SearchBar() {
  return (
    <div className="flex gap-4">
      <Input placeholder="Search an industry..." />

      <Button>
        Analyze
      </Button>
    </div>
  );
}

export default SearchBar;