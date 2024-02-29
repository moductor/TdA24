"use client";

import TagsInput from "react-tagsinput";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./TagsEditor.module.scss";

import "./TagsEditor.scss";

type Props = {
  tags: string[] | undefined;
  onChange: any;
  errorState?: boolean;
  className?: string;
  [prop: string]: any;
};

export default function TagsEditor({
  name,
  tags = [],
  onChange,
  errorState = false,
  className,
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
      <span className={styleClasses(styles, "input-box")}>
        <span className={styleClasses(styles, "input-wrapper", "input")}>
          <TagsInput
            value={tags}
            onChange={onChange}
            className={styleClasses(styles, "tags-input")}
            inputProps={{ placeholder: "Přidat tag..." }}
          />
        </span>
      </span>
    </label>
  );
}
