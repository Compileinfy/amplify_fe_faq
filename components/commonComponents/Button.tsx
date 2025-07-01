// components/Button.tsx
import { MButtonProps } from "@/types/types";
import React from "react";

const baseClasses =
  "px-4 py-2 text-sm rounded focus:outline-none transition-colors";

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-red-700 ",
  success: "bg-green-500 text-white hover:bg-green-600",
};

export default function Button({
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: MButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
