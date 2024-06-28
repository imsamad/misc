import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ActionButton from "./ActionButton";
import Loader from "./Loader";
import { useToast } from "@/components/ui/use-toast"

export default function TextOutput({
  loading,
  complete,
  setPrompt,
  textOutput,
}) {
  const { toast } = useToast()
  const handleDownload = () => {
    if (textOutput) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(
        new Blob([textOutput], { type: "text/plain" })
      );
      link.download = "text_file.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(textOutput);
    toast({
      description: 'Text copied!'
    })
  };
  const handleContinue = () => {
    setPrompt(textOutput);
  };
  return (
    <>
      <Textarea
        readOnly
        className="h-[80%] md:h-full pb-8"
        placeholder="Your output will be shown here..."
        value={textOutput}
      ></Textarea>
      <div className=" w-full min-h-[20%] flex justify-between">
        <div className="flex items-center md:gap-5 gap-2">
          <ActionButton
            onClick={handleCopy}
            className="mt-5 mb-5"
            text={"Copy"}
          />
          {complete && textOutput && (
            <ActionButton
              onClick={handleContinue}
              className="mt-5 mb-5"
              text={"Continue"}
            />
          )}
        </div>
        <ActionButton
          onClick={handleDownload}
          className="mt-5 mb-5"
          text={"Download"}
        />
      </div>
      {loading && (
        <div className="h-[80%] md:h-full z-10 w-full bg-neutral-800 bg-opacity-70 flex absolute items-center justify-center md:absolute top-0 bottom-0">
          <Loader size={60} />
        </div>
      )}
    </>
  );
}
