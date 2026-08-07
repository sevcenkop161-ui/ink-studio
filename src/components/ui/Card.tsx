import type { ComponentPropsWithoutRef } from "react";

export function Card({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-border-hover ${className}`}
      {...props}
    />
  );
}
