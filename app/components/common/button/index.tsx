/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
import classNames from "classnames";
import React from "react";

interface Props {
  icon?: any;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  color?: string;
  className?: string;
  underline?: boolean;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  [x: string]: any;
}

function Button(props: Props) {
  const {
    icon,
    text,
    onClick,
    className,
    primary,
    secondary,
    underline,
    isDisabled,
    type,
    tertiary,
    fullRounded,
    roundedNormal,
    xs,
    sm,
    lg,
    ...r
  } = props;

  const classes = classNames(className, "flex justify-center hover:opacity-80 w-full cursor-pointer", {
    "bg-black text-white ": primary,
    "border-solid border border-black text-black": secondary,
    "rounded-full": fullRounded,
    "rounded-md": roundedNormal,
    "text-xs py-1 px-2": xs,
    "text-sm py-2 px-4": sm,
    "text-md py-1 px-4 4xl:text-3xl 4xl:px-6 4xl:py-3": lg,
    "opacity-20": isDisabled
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      {...r}
    >
      {icon && <span>{icon}</span>}
      {text && <p>{text}</p>}
    </button>
  );
}

export default Button;
