import { styleClasses } from "../../helpers/styleClasses";
import styles from "./Tag.module.scss";

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  [prop: string]: any;
}>;

export default function Tag({ children, className, ...props }: Props) {
  return (
    <div className={styleClasses(styles, "tag", className || "")} {...props}>
      {children}
    </div>
  );
}
