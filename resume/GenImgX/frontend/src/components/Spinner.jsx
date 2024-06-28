import React from "react";

export default function Spinner() {
  return (
    <div
      className="animate-spin  mr-2 inline-block size-4 border-[3px] border-neutral-400 border-t-transparent rounded-full"
      role="status"
      aria-label="loading"
    ></div>
  );
}
