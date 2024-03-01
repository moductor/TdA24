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
  emphasizeRequiredLabel?: boolean;
  pattern?: string;
  disabled?: boolean;
  value?: string | null;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorState?: boolean;
  suffix?: ReactNode;
  infoText?: string;
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
  emphasizeRequiredLabel,
  pattern,
  disabled,
  value,
  defaultValue,
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
          <input
            className={styleClasses(styles, "input")}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            pattern={pattern}
            disabled={disabled}
            value={value === null ? undefined : value}
            defaultValue={defaultValue}
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
