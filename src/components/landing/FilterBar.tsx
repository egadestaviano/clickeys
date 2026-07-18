import { useNavigate, useSearchParams } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

const categoryChips = [
  "Keyboards",
  "Switches",
  "Keycaps",
  "Accessories",
  "Desk Mats",
];

const visualFilters = ["Sort By", "Connectivity", "Series", "Features", "Experience"];

export function FilterBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const goToCategory = (category: string) => {
    const next = activeCategory === category ? "" : category;
    navigate(next ? `/?category=${encodeURIComponent(next)}#popular` : "/#popular");
  };

  return (
    <div className="border-b border-outline-variant bg-surface px-4 py-5 md:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-md bg-surface-container-highest px-4 py-2.5 font-geist text-sm font-semibold text-on-surface transition-colors hover:bg-surface-bright" type="button">
            <MaterialIcon className="text-[18px]" name="tune" />
            All Filters
          </button>

          <div className="flex flex-1 flex-wrap gap-3">
            {visualFilters.map((label) => (
              <button
                key={label}
                className="flex items-center justify-between gap-4 rounded-md border border-outline-variant bg-surface px-4 py-2.5 font-geist text-sm font-semibold text-on-surface transition-colors hover:border-outline"
                type="button"
              >
                {label}
                <MaterialIcon className="text-[18px]" name="expand_more" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant pt-4">
          {categoryChips.map((category) => {
            const active = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => goToCategory(category)}
                className={`rounded-full border px-4 py-1.5 font-geist text-xs font-semibold transition-colors ${
                  active
                    ? "border-brand bg-brand text-on-brand"
                    : "border-outline-variant bg-surface text-on-surface-variant hover:border-outline hover:text-on-surface"
                }`}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
