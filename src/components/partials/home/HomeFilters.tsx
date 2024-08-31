"use client";

import Card from "../../../components/widgets/Card";
import Icon from "../../../components/widgets/Icon";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./HomeFilters.module.scss";

type Props = Readonly<{
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  filterBtnText: string;
}>;

export default function HomeFilters({
  visible = false,
  onClose,
  children,
  filterBtnText,
}: Props) {
  return (
    <div
      data-home-filters={visible ? "visible" : "hidden"}
      className={styleClasses(styles, "filters-sheet")}
    >
      <Card className={styleClasses(styles, "card")}>
        <div className={styleClasses(styles, "card-content")}>
          <div className={styleClasses(styles, "card-title")}>
            <h2>{filterBtnText}</h2>

            <button
              className={styleClasses(styles, "close-button")}
              onClick={onClose}
            >
              <Icon icon="close" />
            </button>
          </div>

          {children}
        </div>
      </Card>

      <div className={styleClasses(styles, "backdrop")} onClick={onClose}></div>
    </div>
  );
}
