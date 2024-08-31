"use client";

import { ReactNode } from "react";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./PageHeader.module.scss";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function PageHeader({ title, children }: Props) {
  return (
    <div className={styleClasses(styles, "header")}>
      <div className={styleClasses(styles, "title-row")}>
        <h1 className="title-2">{title}</h1>
        {children}
      </div>
      <hr />
    </div>
  );
}
