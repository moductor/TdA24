"use client";

import Link from "next/link";
import { MouseEventHandler, ReactNode, Ref, forwardRef } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./Button.module.scss";

type Props = {
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  [prop: string]: any;
};

export default forwardRef<HTMLElement, Props>(function Button(
  { href, className, onClick, children, ...props }: Props,
  ref,
) {
  return href ? (
    <Link
      className={styleClasses(styles, "button", className || "")}
      ref={ref as Ref<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      className={styleClasses(styles, "button", className || "")}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});
