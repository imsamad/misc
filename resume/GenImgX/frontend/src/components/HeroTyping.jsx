import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { HiOutlineSparkles } from "react-icons/hi2";

export default function HeroTyping() {
    return (
        <div className="w-[350px] flex items-center px-2 rounded-md h-14 border hero-box border-[#7448d3] ">
            <HiOutlineSparkles className='text-[#7448d3] h-8 w-8 mr-2' />
            <TypeAnimation
                sequence={['Happy country song with drums', 1300, 'Futuristic woman with cool glasses', 1300, 'Funky 808s beats with 80s vibes', 1300]}
                wrapper="span"
                cursor={true}
                className='text-light'
                repeat={Infinity}
                speed={8}
                deletionSpeed={40}
            />
        </div>
    )
}
