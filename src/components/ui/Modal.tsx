"use client";

import type { ReactNode } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useScrollLock } from "@/hooks/useScrollLock";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  labelledBy?: string;
};

export function Modal({
  open,
  onClose,
  children,
  closeLabel,
  labelledBy,
}: Props) {
  useScrollLock(open);
  useEscapeKey(onClose, open);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-full w-full max-w-4xl overflow-y-auto rounded-lg border border-border bg-card">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/80 text-text backdrop-blur-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
