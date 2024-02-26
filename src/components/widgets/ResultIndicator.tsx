import { styleClasses } from "../../helpers/styleClasses";
import LoadingBar from "./LoadingBar";
import styles from "./ResultIndicator.module.scss";

type Props = {
  result?: boolean | null;
};

export default function ResultIndicator({ result }: Props) {
  if (result === undefined) return <></>;

  if (result === null) return <LoadingBar />;

  return (
    <span
      className={styleClasses(styles, "result")}
      data-result={result}
    ></span>
  );
}
