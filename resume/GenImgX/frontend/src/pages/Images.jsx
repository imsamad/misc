import Navbar from "@/components/Navbar";
import Prompt from "@/components/Prompt";
import { prompts } from "@/lib/prompts/tti.prompts";
import React, { useState } from "react";
import Image from "@/components/Image";
import { imagePrompt } from "@/stores/atoms/prompt";
import { imageOutput } from "@/stores/atoms/output";
import { useRecoilState } from "recoil";

export default function Images() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useRecoilState(imagePrompt);
  const [apiOutput, setApiOutput] = useRecoilState(imageOutput);
  return (
    <div className="min-h-screen min-w-screen bg-black bg-grid-small-white/[0.1] md:bg-grid-small-white/[0.2] pb-10 lg:pb-0 md:pt-20 lg:pt-0  relative flex lg:flex-row flex-col items-center lg:items-center justify-center lg:space-x-14 lg:justify-start lg:px-10 xl:px-20 overflow-x-hidden">
      <Navbar />
      <div className="h-full w-[80%] md:w-[80%] lg:w-[70%] flex flex-col justify-around md:mt-20 md:py-0 pt-32 pb-5">
        <Prompt
          heading={"Image Generation"}
          placeholder={"Enter your text ..."}
          button={"Generate"}
          model={"tti"}
          suggestions={prompts}
          responseType={"blob"}
          type={"image/jpeg"}
          setModelLoading={setLoading}
          text={text}
          setText={setText}
          setApiOutput={setApiOutput}
        />
      </div>
      <div className="w-[80%] relative md:w-[60%] xl:w-[43%] h-72 md:h-96 md:mt-20">
        <Image imageBlob={apiOutput} loading={loading} />
      </div>
    </div>
  );
}
