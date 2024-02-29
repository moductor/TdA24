import { styleClasses } from "../../helpers/styleClasses";
import BackgroundBlob from "./BackgroundBlob";
import styles from "./Card.module.scss";

type Props = Readonly<{
  children?: React.ReactNode;
  decorated?: "right" | "left";
  showEffects?: boolean;
  className?: string;
  [prop: string]: any;
}>;

export default function Card({
  children,
  decorated = "right",
  showEffects = true,
  className,
  ...props
}: Props) {
  return (
    <div
      className={styleClasses(
        styles,
        "card",
        className || "",
        !showEffects ? "without-border-effect" : "",
      )}
      {...props}
    >
      {children}

      {showEffects && (
        <span
          className={styleClasses(styles, "background")}
          data-decorated={decorated}
        >
          <BackgroundBlob />
        </span>
      )}
    </div>
  );
}
