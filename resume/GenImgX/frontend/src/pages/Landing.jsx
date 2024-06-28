import React from 'react';
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
import HeroTyping from '@/components/HeroTyping';
import HeroButton from '@/components/HeroButton';
import HeroImg from '@/components/HeroImg';
import HeroModelList from '@/components/HeroModelList';
import HeroNavbar from '@/components/HeroNavbar';
import HeroModelText from '@/components/HeroModelText';
import Footer from '@/components/Footer';

export default function Landing() {
    return (
        <div className='bg-dark'>
            <HeroNavbar />
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 md:mt-10 bg-gradient-to-br from-neutral-400 to-light py-4 bg-clip-text text-center text-6xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Introducing <br /> <span className="hero-text text-7xl md:text-8xl">GenX</span>
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.8,
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="md:pt-4 pt-2 px-10"
                >
                    <p className="text-neutral-500 text-center md:text-lg ">Next Gen AI model to fulfill all your creativity needs in one click!</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 1,
                        duration: 1,
                        ease: "easeInOut",
                    }}
                    className="pt-12 px-10 flex items-center justify-center flex-col w-full"
                >
                    <div className="flex items-center justify-center flex-col md:flex-row">
                        <HeroTyping />
                        <div className=" mt-4 md:ml-4 md:mt-0">
                            <HeroButton />
                        </div>
                    </div>
                    <HeroImg />
                </motion.div>
            </LampContainer>
            <motion.div className="w-screen pb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 1.3,
                    duration: 0.5,
                    ease: "easeInOut",
                }}>
                <HeroModelText />
                <HeroModelList />
                <Footer />
            </motion.div>
        </div>
    );
}
