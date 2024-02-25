"use client";

import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./TextFieldRow.module.scss";

type Props = {
  type: HTMLInputTypeAttribute;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  showRequiredLabel?: boolean;
  pattern?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  [prop: string]: any;
};

export default function TextFieldRow({
  type,
  name,
  className,
  placeholder,
  required,
  showRequiredLabel,
  pattern,
  value,
  onChange,
  children,
  ...props
}: Props) {
  return (
    <label
      className={styleClasses(styles, "textfield-row", className || "")}
      {...props}
    >
      {children && (
        <span>
          {children}
          {showRequiredLabel && required && (
            <span
              aria-hidden
              className={styleClasses(styles, "required-label")}
            >
              vyžadováno
            </span>
          )}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
