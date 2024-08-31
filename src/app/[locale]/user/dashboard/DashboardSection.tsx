import { ReactNode } from "react";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./DashboardSection.module.scss";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function DashboardSection({ title, children }: Props) {
  return (
    <section className={styleClasses(styles, "section")}>
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
