import { cn } from "@/utils"
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react"

const Container = React.forwardRef<
    HTMLDivElement,
    HTMLMotionProps<'div'>
>(({ className, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 30, opacity: 0 }}
        className={cn("md:mx-auto md:w-3/4 lg:mx-auto lg:w-8/12 mx-4", className)}
        {...props}
    >
        {children}
    </motion.div>
))
Container.displayName = 'Container';
export default Container;
