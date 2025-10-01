import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false,
  className = "",
  ...props 
}: ButtonProps) {
  const baseClasses = "font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gold text-black hover:bg-gold/90 hover:scale-[1.02] hover:shadow-lg",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-gold",
    outline: "border border-gold text-gold hover:bg-gold hover:text-black"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
