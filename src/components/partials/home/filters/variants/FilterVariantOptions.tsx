import { useEffect, useState } from "react";
import { styleClasses } from "../../../../../helpers/styleClasses";
import CheckBoxRow from "../../../../widgets/forms/CheckBoxRow";
import styles from "./FilterVariantOptions.module.scss";

type Props = {
  items: Item[];
  onChange?: (items: Item[]) => void;
};

export default function FilterVariantOptions({
  items: values,
  onChange: changeCb,
}: Props) {
  const [items, setItems] = useState(values);

  useEffect(() => {
    if (!changeCb) return;
    changeCb(items);
  }, [items]);

  const onChange = (index: number, newVal: boolean) => {
    setItems((prev) => {
      const newArray = [...prev];
      newArray[index].selected = newVal;
      return newArray;
    });
  };

  return (
    <div className={styleClasses(styles, "list")}>
      {items.map((item, index) => (
        <CheckBoxRow
          key={index}
          name={item.value}
          checked={item.selected}
          onChange={(e) => onChange(index, e.target.checked)}
        >
          {item.value}
        </CheckBoxRow>
      ))}
    </div>
  );
}

export type Item = {
  value: string;
  selected: boolean;
};
