import { useNavigate, useSearchParams } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

const categoryChips = [
  "Keyboards",
  "Switches",
  "Keycaps",
  "Accessories",
  "Desk Mats",
];

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
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-3">
        <span className="flex items-center gap-2 font-geist text-sm font-semibold text-on-surface-variant">
          <MaterialIcon className="text-[18px] text-brand" name="filter_list" />
          Filter
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {categoryChips.map((category) => {
            const active = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => goToCategory(category)}
                className={`border px-4 py-1.5 font-geist text-xs font-semibold transition-colors ${
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

        {activeCategory ? (
          <button
            onClick={() => navigate("/#popular")}
            className="ml-auto flex items-center gap-1 font-geist text-xs font-semibold text-on-surface-variant transition-colors hover:text-on-surface"
            type="button"
          >
            <MaterialIcon className="text-[16px]" name="close" />
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FilterBar;
