import React from "react";
import { PiLightbulb } from "react-icons/pi";
import SuggestionButton from "./SuggestionButton";

export default function Suggestion({ prompts, setText }) {
  return (
    <div className="w-full grid grid-cols-12 gap-4 mt-7">
      <div className="col-span-12 flex items-center justify-center mb-3">
        <PiLightbulb className="h-5 w-6 mt-0.5 mr-2 text-light" />
        <p className="text-light text-lg">Try a sample prompt</p>
      </div>
      {prompts.map((prompt) => (
        <SuggestionButton
          onClick={() => {
            setText(prompt.text);
          }}
          text={prompt.desc}
        />
      ))}
    </div>
  );
}
