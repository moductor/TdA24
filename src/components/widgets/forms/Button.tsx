"use client";

import Link from "next/link";
import { MouseEventHandler, ReactNode, Ref, forwardRef } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import Icon from "../Icon";
import styles from "./Button.module.scss";

type Props = {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "destructive"
    | "success";
  href?: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  [prop: string]: any;
};

export default forwardRef<HTMLElement, Props>(function Button(
  {
    variant = "primary",
    href,
    type,
    icon,
    className,
    onClick,
    children,
    ...props
  }: Props,
  ref,
) {
  const content = icon ? <Icon icon={icon} /> : children;

  return href ? (
    <Link
      className={styleClasses(
        styles,
        "button",
        icon ? "button-icon" : "",
        className || "",
      )}
      data-button-variant={variant}
      ref={ref as Ref<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      {...props}
    >
      {content}
    </Link>
  ) : (
    <button
      className={styleClasses(
        styles,
        "button",
        icon ? "button-icon" : "",
        className || "",
      )}
      data-button-variant={variant}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
});
