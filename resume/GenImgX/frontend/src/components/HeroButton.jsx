import React from 'react'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import HeroDialog from './HeroDialog'

export default function HeroButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#6667ad_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 md:px-8 py-1 font-semibold text-white backdrop-blur-3xl">
                        Generate!
                    </span>
                </div>
            </DialogTrigger>
            <HeroDialog form={'Signup'} />
        </Dialog>
    )
}
