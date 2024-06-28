import React from "react";

export default function SuggestionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="col-span-6 md:col-span-4 hover:opacity-90 rounded-sm bg-[#202025] flex items-center px-4 py-2 justify-center text-light text-sm"
    >
      {text}
    </button>
  );
}
