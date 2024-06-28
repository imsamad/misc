import React from "react";
import { FaCode } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const Experience = () => {
  return (
    <div
      name="experience"
      className="w-full  bg-[#f0da4e] text-gray-800 mb-32 lg:mb-28"
    >
      <div name="experience" className="h-28 lg:h-12"></div>
      {/* Container */}
      <div className="lg:my-12 max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="text-4xl font-bold border-b-4 inline border-gray-800">
            Work Experience
          </p>
         
        </div>
        
        
        <div className="gap-4 my-12 grid sm:grid-cols-6">
          <div >
            <img
              className="w-28 rounded-xl"
              src={
                "airth.jpg"}
            />
            <p className="text-3xl my-4 mx-auto font-bold">AiRTH</p>
          </div>
          <div className="col-span-5">
            <div className="md:flex justify-between">
              <div className="flex p-1 gap-1">
                <MdWork className="text-4xl text-[#f0da4e]" />
                <p className="text-2xl font-medium">Graphic Designer</p>
              </div>
              <div className="flex gap-2 px-5 py-1 items-center font-medium">
                April 2022 - May 2022
              </div>
            </div>
            <div className="flex gap-2 px-5 py-1 items-center">
              <FaCode className="text-[#f0da4e] w-[4%]" size={60} />
              <p className="text-md w-[90%]">
                Managed the Social Media Handles and all the Graphic Related Work and Helped to engage a lot of peoples in advertising by catchy graphics
              </p>
            </div>
          </div>
        </div>
        
        
        <div className="gap-4 my-11 grid sm:grid-cols-6">
          <div >
            <img
              className="w-28 rounded-xl"
              src={
                "https://imgs.search.brave.com/hsM6Pr1lBJPgy_mhD_0ZdbppC7PrOwM8zlfcTfV1RWs/rs:fit:560:320:1/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS8w/ODIyMGZfMzFkNjIy/M2NmOTA1NDFmNDg3/YjI3ZWQyNGM2YWY3/YWJ-bXYyLnBuZw"
              }
            />
            <p className="text-3xl my-4 mx-auto font-bold">Havoc Therapy</p>
          </div>
          <div className="col-span-5">
          <div className="md:flex justify-between">
              <div className="flex p-1 gap-1">
                <MdWork className="text-4xl text-[#f0da4e]" />
                <p className="text-2xl font-medium">Graphic Designer</p>
              </div>
              <div className="flex gap-2 px-5 py-1 items-center font-medium">
                May 2022 - Aug 2022
              </div>
            </div>
            <div className="flex gap-2 px-5 py-1 items-center">
              <FaCode className="text-[#f0da4e] w-[4%]" size={60} />
              <p className="text-md w-[90%]">
                Worked on an Health-Tech platform to help and support Mental Health Programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
