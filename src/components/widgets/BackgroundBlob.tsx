import { styleClasses } from "../../helpers/styleClasses";
import styles from "./BackgroundBlob.module.scss";

type Props = Readonly<{
  [prop: string]: any;
}>;

export default function BackgroundBlob(props: Props) {
  return <span className={styleClasses(styles, "blob")} {...props}></span>;
}
