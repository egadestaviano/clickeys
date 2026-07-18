import { MaterialIcon } from "@/components/materialIcon";

export function UtilityBar() {
  return (
    <div className="w-full border-b border-outline-variant bg-surface-container-lowest text-on-surface-variant">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-xs font-geist md:px-12">
        <div className="flex items-center gap-5">
          <a className="transition-colors hover:text-brand" href="#">Clickeys</a>
          <a className="transition-colors hover:text-brand" href="#">Business</a>
          <a className="transition-colors hover:text-brand" href="#">Support</a>
        </div>
        <button className="flex items-center gap-1 transition-colors hover:text-brand" type="button">
          <MaterialIcon className="text-[14px]" name="language" />
          ID
        </button>
      </div>
    </div>
  );
}

export default UtilityBar;
