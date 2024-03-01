"use client";

import { ChangeEventHandler, ReactNode } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./TextFieldRow.module.scss";

type Props = {
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  showRequiredLabel?: boolean;
  emphasizeRequiredLabel?: boolean;
  disabled?: boolean;
  value?: string | null;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  errorState?: boolean;
  suffix?: ReactNode;
  infoText?: string;
  children?: ReactNode;
  [prop: string]: any;
};

export default function TextAreaRow({
  name,
  className,
  placeholder,
  required,
  showRequiredLabel,
  emphasizeRequiredLabel,
  disabled,
  value,
  onChange,
  errorState = false,
  suffix,
  infoText,
  children,
  ...props
}: Props) {
  return (
    <label
      className={styleClasses(
        styles,
        "textfield-row",
        className || "",
        errorState ? "state-error" : "",
      )}
      {...props}
    >
      {children && (
        <span className={styleClasses(styles, "label")}>
          {children}
          {showRequiredLabel && required && (
            <span
              aria-hidden
              className={styleClasses(
                styles,
                "required-label",
                emphasizeRequiredLabel ? "emphasize" : "",
              )}
            >
              vyžadováno
            </span>
          )}
        </span>
      )}

      <span className={styleClasses(styles, "input-box")}>
        <span className={styleClasses(styles, "input-wrapper")}>
          <textarea
            className={styleClasses(styles, "input")}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value === null ? undefined : value}
            onChange={onChange}
          />

          {suffix && (
            <span className={styleClasses(styles, "suffix")}>{suffix}</span>
          )}
        </span>

        {infoText && (
          <span className={styleClasses(styles, "info-text")}>{infoText}</span>
        )}
      </span>
    </label>
  );
}
