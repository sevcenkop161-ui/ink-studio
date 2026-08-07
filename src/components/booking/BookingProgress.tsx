type Props = {
  currentIndex: number;
  total: number;
  labels: string[];
};

export function BookingProgress({ currentIndex, total, labels }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-text-secondary">
        {labels[currentIndex]} — {currentIndex + 1}/{total}
      </p>
      <div className="h-1 w-full overflow-hidden rounded-full bg-card">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
