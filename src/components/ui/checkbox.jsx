import * as React from "react";

export const Checkbox = React.forwardRef(
  ({ className = "", checked, onCheckedChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className={`w-4 h-4 accent-blue-500 rounded cursor-pointer ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
