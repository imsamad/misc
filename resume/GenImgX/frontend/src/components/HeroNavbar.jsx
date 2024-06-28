import React from 'react'
import { NavLink } from "react-router-dom";
import CtaButton from './CtaButton';
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import HeroDialog from './HeroDialog';
export default function HeroNavbar() {
    return (
        <nav className="sticky top-0 z-10 bg-[#111111] backdrop-filter backdrop-blur-lg  bg-opacity-30">
            <div className="flex items-center justify-center md:justify-end h-20 md:px-20">
                <div className="flex space-x-8 md:space-x-12 text-light">
                    <NavLink className={'pt-2.5'} to="/models">
                        <span className="text-lg hover:border-b-[1px] hover:opacity-95 text-light tracking-wide">Models</span>
                    </NavLink>
                    <Dialog>
                        <DialogTrigger>
                            <div className='text-lg'>
                                <span className="  hover:border-b-[1px] hover:opacity-95 text-light tracking-wide">Login</span>
                            </div>
                        </DialogTrigger>
                        <HeroDialog form={'Login'} />
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
                            <CtaButton />
                        </DialogTrigger>
                        <HeroDialog form={'Signup'} />
                    </Dialog>
                </div>
            </div>
        </nav>
    )
}
