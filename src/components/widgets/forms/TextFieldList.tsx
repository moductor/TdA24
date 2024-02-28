"use client";

import { HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import Icon from "../Icon";
import ResultIndicator from "../ResultIndicator";
import styles from "./TextFieldList.module.scss";
import TextFieldRow from "./TextFieldRow";

type Props = {
  label?: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  value?: string[];
  erroredValues?: string[];
  errorText?: string;
  onChange?: (value: string[]) => void;
};

export default function TextFieldList({
  label,
  type,
  className,
  value: initialValue,
  erroredValues: initialErrored,
  errorText,
  onChange,
}: Props) {
  const [values, setValues] = useState(initialValue);
  const [erroredValues, setErroredValues] = useState(initialErrored);
  useEffect(() => setValues(initialValue), [initialValue]);
  useEffect(() => setErroredValues(initialErrored), [initialErrored]);

  useEffect(() => {
    if (!onChange) return;
    onChange(values || []);
  }, [values]);

  const listRef = useRef<HTMLDivElement>(null);

  function handleChange(index: number, value: string) {
    if (!values) return;

    if (!value) {
      setValues((prevValues) => toRemovedFromArray(prevValues!, index));
      return;
    }

    setValues((prevValues) => {
      const newValues = [...prevValues!];
      newValues[index] = value;
      return newValues;
    });
  }

  const [wasNewItemAdded, setWasNewItemAdded] = useState(false);
  useEffect(() => {
    if (!wasNewItemAdded) return;
    const list = listRef.current!;
    (list.lastElementChild as HTMLElement)?.querySelector("input")!.focus();
    setWasNewItemAdded(false);
  }, [wasNewItemAdded]);

  function addItem(value: string) {
    setValues((prevValues) => [...(prevValues || []), value]);

    setWasNewItemAdded(true);
  }

  return (
    <div className={styleClasses(styles, "text-field-list", className || "")}>
      {label && <span>{label}</span>}

      <div className={styleClasses(styles, "list")} ref={listRef}>
        {values?.map((item, index) => {
          const isErrored = erroredValues?.includes(item) || false;

          return (
            <div key={index} className={styleClasses(styles, "row")}>
              <span className={styleClasses(styles, "prefix")}>
                <Icon icon="drag" />
              </span>

              <TextFieldRow
                className={styleClasses(styles, "field")}
                type={type}
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                errorState={isErrored}
                infoText={isErrored ? errorText : undefined}
                suffix={
                  isErrored ? (
                    <ResultIndicator
                      result={false}
                      className={styleClasses(styles, "error-indicator")}
                    />
                  ) : undefined
                }
              />
            </div>
          );
        })}
      </div>

      <div className={styleClasses(styles, "row", "new")}>
        <span className={styleClasses(styles, "prefix")}>
          <Icon icon="plus" />
        </span>

        <TextFieldRow
          className={styleClasses(styles, "field")}
          type={type}
          placeholder="Přidat…"
          value={""}
          onChange={(e) => addItem(e.target.value)}
        />
      </div>
    </div>
  );
}

function toRemovedFromArray<T>(array: T[], index: number) {
  return array.filter((_, currentIndex) => currentIndex != index);
}
