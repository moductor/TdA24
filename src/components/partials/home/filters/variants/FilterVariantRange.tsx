import { useState, type ChangeEvent } from "react";
import styles from "./FilterVariantRange.module.scss";

export type PriceRange = {
  min: number;
  max: number;
};

type Props = {
  limits: PriceRange;
  onChange?: (current: PriceRange) => void;
};

export default ({ limits, onChange: changeCb }: Props) => {
  const maxValue = limits.max;
  const minValue = limits.min;

  const [maxRangeValue, setMaxRangeInput] = useState(maxValue);
  const [minRangeValue, setMinRangeInput] = useState(minValue);

  const [leftProgress, setLeftProgress] = useState(0);
  const [rightProgress, setRightProgress] = useState(0);

  if (changeCb) changeCb({ min: minRangeValue, max: maxRangeValue });

  const onMaxValueChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);

    if (value < minValue) setMaxRangeInput(minValue);

    if (value > maxValue) setMaxRangeInput(maxValue);

    if (value >= minRangeValue) {
      setMaxRangeInput(value);
      setRightProgress(
        100 - ((value - minValue) / (maxValue - minValue)) * 100
      );
    }
  };

  const onMinValueChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);

    if (value < minValue) setMinRangeInput(minValue);
    if (value > maxValue) setMinRangeInput(maxValue);

    if (value <= maxRangeValue) {
      setMinRangeInput(value);
      setLeftProgress(((value - minValue) / (maxValue - minValue)) * 100);
    }
  };

  const stylesos = {
    left: `${leftProgress}%`,
    right: `${rightProgress}%`,
    width: `${100 - (leftProgress + rightProgress)}%`,
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["slider"]}>
        <div className={styles["progress-bar"]} style={stylesos}></div>
      </div>
      <div className={styles["range-inputs"]}>
        <input
          className={styles["range-input"]}
          type="range"
          name="min-range-input"
          min={minValue}
          max={maxValue}
          value={minRangeValue}
          onChange={onMinValueChange}
        />
        <input
          className={styles["range-input"]}
          type="range"
          name="maxRangeInput"
          min={minValue}
          max={maxValue}
          value={maxRangeValue}
          onChange={onMaxValueChange}
        />
      </div>

      <div className={styles["num-input-field"]}>
        <input
          type="number"
          name=""
          id="num-input-min"
          min={minValue}
          max={maxValue}
          value={minRangeValue}
          onChange={onMinValueChange}
        />
        <input
          type="number"
          name=""
          id="num-input-max"
          min={minValue}
          max={maxValue}
          value={maxRangeValue}
          onChange={onMaxValueChange}
        />
      </div>
    </div>
  );
};
