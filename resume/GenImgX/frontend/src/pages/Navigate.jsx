import React from 'react';
import { HoverEffect } from '../components/ui/card-hover-effect';
import { BsRobot } from 'react-icons/bs';
import { projects } from '@/lib/projects';
export default function Navigate() {
  return (
    <div className="min-h-screen w-full bg-dark  bg-grid-white/[0.125]  relative flex items-center justify-center overflow-x-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-dark  [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"></div>
      <div className=" flex items-center justify-center flex-col min-h-screen min-w-screen z-10">
        <div className="flex items-center gap-3 mt-16 md:mt-0">
          <BsRobot className="text-light text-3xl"></BsRobot>
          <h2 className="text-light text-3xl  tracking-wide">
            Choose your model
          </h2>
        </div>
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
      </div>
    </div>
  );
}
