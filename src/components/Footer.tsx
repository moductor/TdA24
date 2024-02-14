import { styleClasses } from "../helpers/styleClasses";
import styles from "./Footer.module.scss";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styleClasses(styles, "footer")}>
      &copy; {year} Teacher digital Agency
    </footer>
  );
}
