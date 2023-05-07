import { cn } from "@/utils"
import React from "react"

const Container = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("md:mx-auto md:w-5/6 lg:mx-auto lg:w-8/12 mx-4", className)}
        {...props}
    >
        {children}
    </div>
))
Container.displayName = 'Container';
export default Container;
