import Link from "next/link";
import { styleClasses } from "../helpers/styleClasses";
import styles from "./Footer.module.scss";
import Logo from "./widgets/Logo";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styleClasses(styles, "footer")}>
      <div className={styleClasses(styles, "footer-info")}>
        <div>
          <Link
            href="/"
            title="Přejít na domovskou stránku"
            className={styleClasses(styles, "logo-link")}
          >
            <Logo className={styleClasses(styles, "logo")} aria-hidden="true" />
          </Link>
          <span className={styleClasses(styles, "copyright")}>
            &copy; {year} Teacher digital Agency
          </span>
        </div>
        <ul className={styleClasses(styles, "footer-list")}>
          <li>
            <Link href="/gdpr">Zásady ochrany osobních údajů</Link>
          </li>
          <li>
            <Link href="/tos">Podmínky používání</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
