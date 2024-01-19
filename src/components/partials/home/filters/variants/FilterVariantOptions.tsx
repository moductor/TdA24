import { useState } from "react";
import styles from "./FilterVariantOptions.module.scss";

type Props = {
  items: Item[];
  onChange?: (items: Item[]) => void;
};

export default ({ items: values, onChange: changeCb }: Props) => {
  const [items, setItems] = useState(values);

  const onChange = (index: number) => {
    setItems((prev) => {
      const newVal = [...prev];
      newVal[index].selected = !newVal[index].selected;

      if (changeCb) changeCb(newVal);

      return newVal;
    });
  };

  return (
    <div className={styles["list"]}>
      {items.map((item, index) => (
        <label key={index} className={styles["item"]}>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onChange(index)}
          />
          {item.value}
        </label>
      ))}
    </div>
  );
};

export type Item = {
  value: string;
  selected: boolean;
};
