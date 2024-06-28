import React from 'react'
import { motion } from "framer-motion";

const modelTextVariants = {
    offscreen: {
        y: -100
    },
    onscreen: {
        y: 30,
        transition: {
            type: "spring",
            duration: 2
        }
    }
};
export default function HeroModelText() {
    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            className="w-full mb-32">
            <motion.div className="w-full text-center" variants={modelTextVariants}>
                <h2 className="text-light md:text-5xl text-4xl font-medium">Explore our Models</h2>
            </motion.div>
        </motion.div>
    )
}
