import React from 'react'
import hero from '../assets/images/hero.png'
import { motion } from "framer-motion";

export default function HeroImg() {
    const cardVariants = {
        offscreen: {
            y: 150
        },
        onscreen: {
            y: 40,
            transition: {
                type: "spring",
                duration: 2
            }
        }
    };
    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            className="md:w-[80%] mt-12">
            <motion.div className="" variants={cardVariants}>
                <div className="border-neutral-500 border-4 rounded-lg md:mx-0 -mx-10">
                    <img src={hero} alt="" />
                </div>
            </motion.div>
        </motion.div>
    )
}
