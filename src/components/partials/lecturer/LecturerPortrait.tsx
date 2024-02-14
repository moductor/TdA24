import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerPortrait.module.scss";

type Props = Readonly<{
  portrait?: string;
  className?: string;
  [prop: string]: any;
}>;

export default function LecturerPortrait({
  portrait,
  className,
  ...props
}: Props) {
  return portrait ? (
    <img // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src={portrait}
      alt=""
      {...props}
    />
  ) : (
    <img // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src="/images/portrait-placeholder.svg"
      alt=""
      {...props}
    />
  );
}
