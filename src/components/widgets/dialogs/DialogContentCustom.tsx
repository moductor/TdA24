import { ReactNode } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./DialogContentCustom.module.scss";

type Props = {
  children?: ReactNode;
  className?: string;
  [prop: string]: any;
};

export default function DialogContentCustom({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={styleClasses(styles, "content-custom", className || "")}
      {...props}
    >
      {children}
    </div>
  );
}
