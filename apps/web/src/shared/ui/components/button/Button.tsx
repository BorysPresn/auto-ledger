import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import clsx from "clsx";

import { Icon, type IconName } from "../icon";

import styles from "./Button.module.scss";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  shape?: "pill" | "round" | "modal";
  variant?: "white" | "blue" | "pink";
  border?: "grey";
  children?: ReactNode;
  icon?: IconName;
  iconPosition?: "left" | "right";
};

export const Button = ({
  shape = "pill",
  variant = "blue",
  border,
  children,
  className,
  icon,
  iconPosition = "left",
  ...rest
}: ButtonProps) => {
  const classNames = clsx(
    styles.button,
    styles[`button--${shape}`],
    styles[`button--${variant}`],
    border && styles[`border--${border}`],
    className,
  );

  return (
    <button className={classNames} type="button" {...rest}>
      {icon && iconPosition === "left" && <Icon name={icon} />}
      {children}
      {icon && iconPosition === "right" && <Icon name={icon} />}
    </button>
  );
};
