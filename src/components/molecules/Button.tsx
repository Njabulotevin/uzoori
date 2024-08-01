import React, { EventHandler, ReactNode } from "react";
import { SpinningWheel } from "../SpinningWheel";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title?: string;
  className?: string;
  children?: ReactNode;
  icon?: { icon: ReactNode; variant: "icon-only" | "icon-label" };
  size: "default" | "extraSmall" | "medium" | "large";
  variant: "primary" | "secondary" | "tertiary";
  isPending?: boolean;
  borderRadius?: string;
}

export default function Button({
  title,
  className,
  children,
  variant,
  icon,
  size,
  isPending,
  borderRadius,
  ...rest
}: ButtonProps) {
  const variants = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    tertiary: "btn btn-tertiary",
  };

  const sizes = {
    default: "text-xs font-medium",
    extraSmall: "text-xs font-medium",
    medium: "lg:text-sm text-[12px] font-medium",
    large: "text-base font-medium",
  };

  return (
    <button
      className={` ${variants[variant]} ${sizes[size]} ${
        icon?.variant === "icon-label"
          ? "flex gap-2 items-center justify-center"
          : ""
      } font-medium ${
        borderRadius ? borderRadius : "rounded-lg"
      } ${className} `}
      {...rest}
    >
      {icon && !isPending && <span>{icon.icon}</span>}
      {icon?.variant === "icon-only" ? (
        ""
      ) : (
        <span className="font-medium flex gap-2 justify-center  items-center ">
          {isPending && (
            <span>
              <SpinningWheel
                className="w-[20px] h-[20px] fill-gray-50 spin-fast"
                outerColor="fill-violet-400"
              />
            </span>
          )}
          {title ? title : children}
        </span>
      )}
    </button>
  );
}
