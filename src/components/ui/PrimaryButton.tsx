
import React from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  glowing?: boolean;
}

const PrimaryButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  glowing = false,
  ...props
}: PrimaryButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center transition-all duration-300 font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-[0.98]",
    outline: "bg-transparent border border-border text-foreground hover:bg-secondary/50 active:scale-[0.98]",
    ghost: "bg-transparent text-foreground hover:bg-secondary active:scale-[0.98]",
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const glowClass = glowing ? "shadow-[0_0_15px_rgba(var(--primary)/0.5)]" : "button-shadow";
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        glowClass,
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default PrimaryButton;
