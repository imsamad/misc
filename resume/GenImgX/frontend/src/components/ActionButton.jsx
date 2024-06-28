import React from "react";
import { cn } from "@/lib/utils";

export default function ActionButton({ className, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-1.5 text-light hover:opacity-90 text-sm bg-neutral-900 border border-neutral-700 rounded-md",
        className
      )}
    >
      {text}
    </button>
  );
}
