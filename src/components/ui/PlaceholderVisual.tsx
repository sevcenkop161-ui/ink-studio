import { getPlaceholderGradient } from "@/lib/placeholder-visual";

type Props = {
  index?: number;
  className?: string;
};

export function PlaceholderVisual({ index = 0, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-lg border border-border ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: getPlaceholderGradient(index) }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-card via-bg to-card" />
    </div>
  );
}
