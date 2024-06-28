import { cn } from "../../util/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          className="relative group  block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => navigate(item.page)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#c2c2c2db] dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.8 },
                }}
              />
            )}
          </AnimatePresence>
          <Card experimental={item.experimental}>
            <CardTitle icon={item.icon} text={item.title}></CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({ className, children, experimental }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-[#a2a2a26d] dark:border-white/[0.2] group-hover:border-slate-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
      {experimental && (
        <div className="absolute top-4 -right-2">
          <Badge variant="secondary">Experimental</Badge>
        </div>
      )}
    </div>
  );
};

export const CardTitle = ({ className, text, icon }) => {
  return (
    <div className="flex gap-1 items-center mt-4">
      {icon}
      <h4 className={cn("text-zinc-100 font-bold tracking-wide ", className)}>
        {text}
      </h4>
    </div>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
