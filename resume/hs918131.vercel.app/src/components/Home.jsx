import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Typed from "react-typed";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link } from "react-scroll";
import { SiLeetcode } from "react-icons/si";

function Home() {
  return (
    <div name="home" className="w-full h-screen bg-[#f0da4e]">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className="md:mb-[-10px] text-gray-800">Hi, my name is</p>
        <div className="flex justify-between items-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-800">
            Harshit Sharma
          </h1>
          <img className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-[50%] md:flex" src="/myIcon.jpg" alt="icon" />
        </div>
        <div className="flex flex-row  lg:mt-[-30px]">
          {/* <h2 className='text-2xl sm:text-5xl font-bold text-[#8892b0]'>
          I'm a  
        </h2> */}
          <Typed
            className="text-2xl sm:text-5xl font-bold text-gray-800 items-center"
            strings={["Full Stack Developer", "Software Developer"]}
            typeSpeed={199}
            backSpeed={200}
            loop
          />
        </div>
        <p className="text-gray-800 py-4 max-w-[700px]">
          I’m a full-stack developer and an aspiring software developer.
          Currently, I’m focused on building full-stack web applications that people can use to solve real-world problems. I’m also learning new technologies and frameworks to improve my skills and knowledge.
        </p>
        {/* <div>
          <Link to="about" smooth={true} offset={50} duration={500}>
            <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-[#FACC15] hover:border-[#FACC15]">
              Learn More
              <span className="group-hover:rotate-90 duration-300">
                <HiArrowNarrowRight className="ml-3 " />
              </span>
            </button>
          </Link>
        </div> */}
        <div className="lg:hidden flex mt-10">
          <ul className="flex py-2 mx-auto">
            <li className=" mx-2 w-[60px] px-4 h-[60px] flex justify-center items-center hover:scale-110 duration-500 bg-blue-600 text-gray-800">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/hs918131/"
                className="flex justify-between items-center w-full text-gray-800"
              >
                <FaLinkedin size={30} />
              </a>
            </li>
            <li className="mx-2 w-[60px] px-4 h-[60px] flex justify-center items-center hover:scale-110 duration-500 bg-[#333333] text-gray-800">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/hs918131"
                className="flex justify-between items-center w-full text-gray-800"
              >
                <FaGithub size={30} />
              </a>
            </li>
            <li className="mx-2 w-[60px] px-4 h-[60px] flex justify-center items-center hover:scale-110 duration-500 bg-yellow-600 text-gray-800">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://leetcode.com/hs918131/"
                className="flex justify-between items-center w-full text-gray-800"
              >
                <SiLeetcode size={30} />
              </a>
            </li>
            <li className="mx-2 w-[60px] px-4 h-[60px] flex justify-center items-center hover:scale-110 duration-500 bg-purple-600 text-gray-800">
              <a
                target="_blank"
                rel="noreferrer"
                href="/re.pdf"
                className="flex justify-between items-center w-full text-gray-800"
              >
                <BsFillPersonLinesFill size={30} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
