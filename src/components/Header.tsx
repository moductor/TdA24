import { ReactNode } from "react";
import { styleClasses } from "../helpers/styleClasses";
import styles from "./Header.module.scss";
import Navbar from "./Navbar";
import BackgroundWrapper from "./widgets/BackgroundWrapper";

type Props = Readonly<{
  showBackButton?: boolean;
  showUserMenu?: boolean;
  children?: ReactNode;
  [prop: string]: any;
}>;

export default function Header({
  showBackButton,
  showUserMenu,
  children,
  ...props
}: Props) {
  return (
    <header {...props} className={styleClasses(styles, "header")}>
      <BackgroundWrapper>
        <div className="content-grid">
          <Navbar showBackButton={showBackButton} showUserMenu={showUserMenu} />
          <div>{children}</div>
        </div>
      </BackgroundWrapper>
    </header>
  );
}
