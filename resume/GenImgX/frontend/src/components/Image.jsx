import React from "react";
import ActionButton from "@/components/ActionButton";
import { CiImageOn } from "react-icons/ci";
import Loader from "./Loader";
export default function Image({ loading, imageBlob }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageBlob;
    link.download = "image_file.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="border border-neutral-400 md:w-full h-[80%] md:h-full border-opacity-40 flex flex-col items-center justify-center">
        {imageBlob ? (
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={imageBlob}
              alt="image"
              className="object-cover w-full h-full absolute top-0 left-0"
            />
          </div>
        ) : (
          <CiImageOn className="w-1/2 h-1/2 text-neutral-500" />
        )}
      </div>
      <div className=" w-full flex justify-end">
        <ActionButton
          onClick={handleDownload}
          className="mt-5 mb-5"
          text={"Download"}
        />
      </div>
      {loading && (
        <div className="h-[80%] md:h-full z-10 w-full bg-neutral-800 bg-opacity-70 flex items-center justify-center absolute top-0 bottom-0">
          <Loader size={60} />
        </div>
      )}
    </>
  );
}
