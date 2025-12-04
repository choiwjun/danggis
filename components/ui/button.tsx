import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold shadow-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary-dark hover:shadow-md",
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 hover:shadow-md",
                outline:
                    "border-2 border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary hover:bg-primary-soft",
                secondary:
                    "bg-gray-100 text-gray-900 hover:bg-gray-200",
                ghost: "shadow-none hover:bg-primary-soft hover:text-primary",
                link: "text-primary underline-offset-4 hover:underline shadow-none",
                soft: "bg-primary-soft text-primary hover:bg-primary-soft/80",
            },
            size: {
                default: "h-11 px-5 py-2.5",
                sm: "h-9 rounded-lg px-3.5 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
