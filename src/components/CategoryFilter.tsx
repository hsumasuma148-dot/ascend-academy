import { categories } from "@/data/mockData";

const CategoryFilter = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected === cat
            ? "gradient-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
