import React from 'react'

const About = () => {
  return (
    <div>
      <div name="about" className="h-8 lg:h-0">
      </div>
    <div className='w-full h-screen bg-[#f0da4e] text-gray-800'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <div className='sm:text-right pb-8 pl-4'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-800'>
              About
            </p>
          </div>
          <div></div>
          </div>
          <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
            <div className='sm:text-right text-4xl font-bold'>
              <p>Hi. I'm Harshit, nice to meet you. Please take a look around.</p>
            </div>
            <div>
              <p>I'm a self-taught Indian programmer, passionate about crafting impactful software. I aspire to collaborate with like-minded individuals, innovating in Science and Tech. In my free time, I learn languages and enjoy Rap and Indie music.</p>  
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default About
