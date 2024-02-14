import { styleClasses } from "../helpers/styleClasses";
import styles from "./Header.module.scss";
import Navbar from "./Navbar";
import BackgroundWrapper from "./widgets/BackgroundWrapper";

type Props = Readonly<{
  [prop: string]: any;
}>;

export default function Header(props: Props) {
  return (
    <header {...props} className={styleClasses(styles, "header")}>
      <BackgroundWrapper>
        <div className={styleClasses(styles, "content-grid")}>
          <Navbar />
          <div className={styleClasses(styles, "content")}>
            <h1 className={styleClasses(styles, "subtitle")}>
              Dynamický katalog lektorů
            </h1>
            <p className={styleClasses(styles, "title")}>
              Vaše <span>vzdělání</span> je u nás v dobrých rukou!
            </p>
          </div>
        </div>
      </BackgroundWrapper>
    </header>
  );
}
