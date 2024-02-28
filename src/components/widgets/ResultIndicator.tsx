import { styleClasses } from "../../helpers/styleClasses";
import LoadingBar from "./LoadingBar";
import styles from "./ResultIndicator.module.scss";

type Props = {
  result?: boolean | null;
  className?: string;
};

export default function ResultIndicator({ result, className }: Props) {
  if (result === undefined) return <></>;

  if (result === null) return <LoadingBar />;

  return (
    <span
      className={styleClasses(styles, "result", className || "")}
      data-result={result}
    ></span>
  );
}
