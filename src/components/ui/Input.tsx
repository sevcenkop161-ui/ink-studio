import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = "", ...props }: Props) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm text-text-secondary">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-md border bg-bg-secondary px-4 py-3 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent ${
          error ? "border-red-500" : "border-border"
        } ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
