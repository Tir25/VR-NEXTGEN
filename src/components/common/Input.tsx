import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm text-white/80 font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-black border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-red-400 text-xs">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-white/60 text-xs">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
