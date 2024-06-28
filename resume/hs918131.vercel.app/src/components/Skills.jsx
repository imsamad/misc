import React from "react";

const skills = [
  {
    name: "Next.js",
    icon: "/next.png",
  },
  {
    name: "React",
    icon: "/react.png",
  },
  {
    name: "Node.js",
    icon: "/node.png",
  },
  {
    name: "MongoDB",
    icon: "/mongo.png",
  },
  {
    name: "PostgreSQL",
    icon: "/postgres.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/tailwind.png",
  },
  {
    name: "Docker",
    icon: "/docker.png",
  },
  {
    name: "JavaScript",
    icon: "./javascript.png",
  },
  {
    name: "Python",
    icon: "/python.png",
  },
  // {
  //   name: "AWS",
  //   icon: "/aws.png",
  // }
];

const Skills = () => {
  return (
    <div className="w-full h-screen bg-[#f0da4e] text-gray-800 mb-32 lg:mb-0">
      <div name="skills" className="h-32 lg:h-0"></div>
      {/* Container */}
      <div className="lg:my-12 max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="text-4xl font-bold border-b-4 inline border-gray-800">
            Tech Stack
          </p>
          <p className="py-4 ">
            // Here are all the technologies I've worked with:
          </p>
        </div>
        <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-4 text-center py-8">
          {skills?.map((skill) => (
            <div className="flex flex-col bg-[#f0da4e] hover:scale-110 duration-500 py-2 aspect-square">
              <img
                className="w-20 h-20 mx-auto my-auto"
                src={skill.icon}
                alt={skill?.name}
              />
              <p className="my-4">{skill?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
