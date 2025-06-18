// components/ui/button.tsx

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "link";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" && "bg-primary text-white hover:bg-primary/90 px-4 py-2",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground px-4 py-2",
          variant === "link" && "underline-offset-4 hover:underline text-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };