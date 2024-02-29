import { ReactNode } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./DialogButtons.module.scss";

type Props = {
  children?: ReactNode;
  className?: string;
  [prop: string]: any;
};

export default function DialogButtons({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={styleClasses(styles, "button-row", className || "")}
      {...props}
    >
      {children}
    </div>
  );
}
