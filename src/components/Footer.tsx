import { useTranslations } from "next-intl";

import { styleClasses } from "../helpers/styleClasses";
import { Link } from "../i18n/routing";
import styles from "./Footer.module.scss";
import Logo from "./widgets/Logo";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const t = useTranslations("Footer");

  return (
    <footer className={styleClasses(styles, "footer")}>
      <div className={styleClasses(styles, "footer-info")}>
        <div>
          <Link
            href="/"
            title={t("logo-link")}
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
            <Link href="/gdpr">{t("gdpr")}</Link>
          </li>
          <li>
            <Link href="/tos">{t("tos")}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
