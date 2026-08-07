import { getPlaceholderGradient } from "@/lib/placeholder-visual";

type Props = {
  name: string;
  index?: number;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Avatar({ name, index = 0 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full border border-border text-sm font-medium"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: getPlaceholderGradient(index) }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-card via-bg to-card" />
      <span className="relative">{getInitials(name)}</span>
    </div>
  );
}
