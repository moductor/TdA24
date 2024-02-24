"use client";

import { MouseEventHandler, ReactNode, Ref, forwardRef } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./Button.module.scss";

type Props = {
  link?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  [prop: string]: any;
};

export default forwardRef<HTMLElement, Props>(function Button(
  { link = false, className, onClick, children, ...props }: Props,
  ref,
) {
  return link ? (
    <a
      className={styleClasses(styles, "button", className || "")}
      ref={ref as Ref<HTMLAnchorElement>}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
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
