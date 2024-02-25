import { ChangeEvent, useEffect, useState } from "react";
import TextFieldRow from "../../../components/widgets/forms/TextFieldRow";
import { delay } from "../../../helpers/delay";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./TextFieldRowAutosave.module.scss";

type Props = {
  name: string;
  label?: string;
  initialValue?: string;
  autosave?: (name: string, value: string | undefined) => Promise<boolean>;
  required?: boolean;
};

export default function TextFieldRowAutosave({
  name,
  label,
  initialValue,
  autosave,
  required,
}: Props) {
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [changed, setChanged] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!changed) return;
    if (!autosave) return;
    if (!value && required) return;

    delay(
      `autosave textfield value - ${name}`,
      async () => {
        const result = await autosave(name, value);
        setResult(result);
        delay(`hide result - ${name}`, () => setResult(undefined), 2000);
      },
      500,
    );
  }, [value]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setChanged(true);
    setResult(undefined);

    if (!e.target.value) {
      setValue(undefined);
      return;
    }

    setValue(e.target.value);
  }

  return (
    <TextFieldRow
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      showRequiredLabel={true}
      emphasizeRequiredLabel={changed && !value}
    >
      {label}

      {result !== undefined && (
        <span
          className={styleClasses(styles, "result")}
          data-result={result}
        ></span>
      )}
    </TextFieldRow>
  );
}
