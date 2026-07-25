import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium",
  {
    variants: {
      variant: {
        primary:
          "bg-[#23412D] text-white hover:bg-[#1a3022] hover:-translate-y-1",

        outline:
          "border border-[#23412D] text-[#23412D] hover:bg-[#23412D] hover:text-white",

        ghost:
          "hover:bg-neutral-100",
      },

      size: {
        sm: "h-10 px-5",

        md: "h-12 px-7",

        lg: "h-14 px-10 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    />
  );
}