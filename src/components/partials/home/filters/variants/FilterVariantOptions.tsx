import { useState } from "react";
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

  const onChange = (index: number, newVal: boolean) => {
    setItems((prev) => {
      const newArray = [...prev];
      newArray[index].selected = newVal;

      if (changeCb) changeCb(newArray);

      return newArray;
    });
  };

  return (
    <div className={styles["list"]}>
      {items.map((item, index) => (
        <label key={index} className={styles["item"]}>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={(e) => onChange(index, e.target.checked)}
          />
          {item.value}
        </label>
      ))}
    </div>
  );
}

export type Item = {
  value: string;
  selected: boolean;
};
