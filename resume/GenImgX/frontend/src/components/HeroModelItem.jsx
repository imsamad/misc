import React from 'react'
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import beatsai from '../assets/images/beatsai.png'
import textai from '../assets/images/textai.png'
import imageai from '../assets/images/imageai.png'

export default function HeroModelItem({ header, text, className, img }) {
    const imageComponents = {
        beatsai: beatsai,
        textai: textai,
        imageai: imageai
    };
    const modelVariants = {
        offscreen: {
            opacity: 0.3
        },
        onscreen: {
            opacity: 1,
            transition: {
                duration: .5,
                ease: "easeInOut",
            }
        }
    };
    return (
        <motion.div initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
            className='w-full'
        >
            <motion.div className={cn("w-full flex xl:justify-between items-center flex-col xl:flex-row ", className)} variants={modelVariants}>
                <div className="rounded-xl w-full xl:w-1/2">
                    <img src={imageComponents[img]} alt="" className="w-fit rounded-xl" />
                </div>
                <div className="flex flex-col items-center w-full xl:w-1/2 mt-auto mb-auto text-center">
                    <h4 className="text-3xl text-light font-medium mt-5 xl:mt-0">{header}</h4>
                    <p className="xl:px-16 mt-10 px-3 text-sm md:text-base text-neutral-400 opacity-55 text-center xl:text-left">
                        {text}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}
