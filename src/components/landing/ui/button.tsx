"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "brand"
  | "forest"
  | "outline"
  | "soft"
  | "ghost"
  | "link"
  | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  href?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantStyles = {
  brand: "bg-brand text-white hover:opacity-90 shadow-sm",
  forest: "bg-forest text-white hover:bg-forest/90",
  outline:
    "border border-border hover:bg-mint hover:text-foreground",
  soft: "bg-mint text-forest hover:bg-accent",
  ghost: "hover:bg-mint hover:text-forest",
  link: "text-brand underline-offset-4 hover:underline",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeStyles = {
  default: "h-11 px-6 py-2",
  sm: "h-9 px-4 text-xs",
  lg: "h-12 px-10 text-base",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "brand",
      size = "default",
      asChild = false,
      href,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // 👉 If href is provided → render Link
    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    // 👉 If using Slot
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };