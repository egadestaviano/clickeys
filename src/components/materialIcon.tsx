import { cn } from "@/lib/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  fill?: boolean;
};

export function MaterialIcon({ name, className, fill }: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined",
        fill && "fill",
        className,
      )}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default MaterialIcon;
