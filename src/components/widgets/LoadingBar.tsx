import { styleClasses } from "../../helpers/styleClasses";
import styles from "./LoadingBar.module.scss";

type Props = {
  className?: string;
  [prop: string]: any;
};

export default function LoadingBar({ className, ...props }: Props) {
  return (
    <div
      className={styleClasses(styles, "loading-bar", className || "")}
      {...props}
    >
      <span className={styleClasses(styles, "loading-dot")}></span>
      <span className={styleClasses(styles, "loading-dot")}></span>
      <span className={styleClasses(styles, "loading-dot")}></span>
    </div>
  );
}
