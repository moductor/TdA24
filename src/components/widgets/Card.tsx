import { styleClasses } from "../../helpers/styleClasses";
import BackgroundBlob from "./BackgroundBlob";
import styles from "./Card.module.scss";

type Props = Readonly<{
  children?: React.ReactNode;
  decorated?: "right" | "left";
  className?: string;
  [prop: string]: any;
}>;

export default function Card({
  children,
  decorated = "right",
  className,
  ...props
}: Props) {
  return (
    <div className={styleClasses(styles, "card", className || "")} {...props}>
      {children}

      <span
        className={styleClasses(styles, "background")}
        data-decorated={decorated}
      >
        <BackgroundBlob />
      </span>
    </div>
  );
}
