"use client";

import { ChangeEventHandler, ReactNode } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./CheckBoxRow.module.scss";

type Props = {
  name?: string;
  className?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  [prop: string]: any;
};

export default function CheckBoxRow({
  name,
  className,
  checked,
  onChange,
  children,
  ...props
}: Props) {
  return (
    <label
      className={styleClasses(styles, "checkbox-row", className || "")}
      {...props}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="visually-hidden"
      />

      <span className={styleClasses(styles, "check")}></span>

      {children && <span>{children}</span>}
    </label>
  );
}
