import { styleClasses } from "../../helpers/styleClasses";
import styles from "./BackgroundWrapper.module.scss";
import BackgroundWrapperBackground from "./BackgroundWrapperBackground";

type Props = Readonly<{
  children?: React.ReactNode;
  [prop: string]: any;
}>;

export default function BackgroundWrapper({ children, ...props }: Props) {
  return (
    <div className={styleClasses(styles, "wrapper")} {...props}>
      {children}
      <BackgroundWrapperBackground />
    </div>
  );
}
