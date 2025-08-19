import React from "react";
import { Pressable, Text, View, PressableProps } from "react-native";

interface ButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPlacement = "left",
  variant = "primary",
  size = "md",
  className = "",
  textClassName = "",
  disabled = false,
  ...pressableProps
}) => {
  // Base button styles
  const baseStyles = "flex-row items-center justify-center rounded-xl";

  // Variant styles
  const variantStyles = {
    primary: "bg-primary active:opacity-80",
    secondary: "bg-gray-500 active:opacity-80",
    outline: "bg-transparent border border-app active:bg-gray-50",
    ghost: "bg-transparent active:bg-gray-50",
    danger: "bg-red-500 active:opacity-80",
    success: "bg-green-500 active:opacity-80",
    warning: "bg-yellow-500 active:opacity-80",
    info: "bg-blue-500 active:opacity-80",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  // Text styles based on variant
  const textVariantStyles = {
    primary: "text-white font-medium",
    secondary: "text-white font-medium",
    outline: "text-primary font-medium",
    ghost: "text-primary font-medium",
    danger: "text-white font-medium",
    success: "text-white font-medium",
    warning: "text-white font-medium",
    info: "text-white font-medium",
  };

  // Text size styles
  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  // Disabled styles
  const disabledStyles = disabled ? "opacity-50" : "";

  // Combine all styles
  const buttonClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textStyles = [
    textVariantStyles[variant],
    textSizeStyles[size],
    textClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Icon spacing
  const iconSpacing = icon ? (iconPlacement === "left" ? "mr-2" : "ml-2") : "";

  return (
    <Pressable
      className={buttonClassName}
      disabled={disabled}
      {...pressableProps}
    >
      {/* Left icon */}
      {icon && iconPlacement === "left" && (
        <View className={iconSpacing}>{icon}</View>
      )}

      {/* Button text/content */}
      {typeof children === "string" ? (
        <Text className={textStyles}>{children}</Text>
      ) : (
        children
      )}

      {/* Right icon */}
      {icon && iconPlacement === "right" && (
        <View className={iconSpacing}>{icon}</View>
      )}
    </Pressable>
  );
};
