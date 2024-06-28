import React from "react";
import OncoMRI from "../assets/OncoMRI.jpg";
import GitInfo from "../assets/GitInfo.jpg";
import SafeShare from "../assets/SafeShare.jpg";

const Projects = () => {
  return (
    <div className="mt-20 md:mb-32 w-full md:h-screen text-gray-800 bg-[#f0da4e]">
      <div name="projects" className="lg:h-28"></div>
      <div className="py-32 max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-800 border-gray-800">
            Projects
          </p>
          <p className="py-6">// Check out some of my recent projects</p>
        </div>

        {/* Container */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Grid Item */}
          
          <div
            style={{ backgroundImage: `url(${GitInfo})` }}
            className="shadow-md shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* Hover Effects */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-[#f0da4e] tracking-wider">
                GitInfo
              </span>
              <div className="pt-8 text-center">
                <a href="https://git-info-snowy.vercel.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#f0da4e] text-gray-800 font-bold text-lg">
                    Link
                  </button>
                </a>
                <a href="https://github.com/Hs918131/GitInfo">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#f0da4e] text-gray-800 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${OncoMRI})` }}
            className="shadow-md shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* Hover Effects */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-[#f0da4e] tracking-wider">
                OncoMRI
              </span>
              <div className="pt-8 text-center">
                <a href="https://oncomri.streamlit.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#f0da4e] text-gray-800 font-bold text-lg">
                    Link
                  </button>
                </a>
                <a href="https://github.com/Hs918131/OncoMRI">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#f0da4e] text-gray-800 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${SafeShare})` }}
            className="shadow-md shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* Hover Effects */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-[#f0da4e] tracking-wider">
                SafeShare
              </span>
              <div className="pt-8 text-center">
                <a href="https://github.com/Hs918131/Safe-Share">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-[#f0da4e] text-gray-800 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Projects;
