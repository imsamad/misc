import React from "react";
import Spinner from "./Spinner";

export default function ModelButton({ text, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-5 py-1.5 ml-auto mt-4 disabled:text-neutral-400 flex items-center text-light enabled:hover:opacity-90 text-sm bg-neutral-900 border border-neutral-700 rounded-md "
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
}
