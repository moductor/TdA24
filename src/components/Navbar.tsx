import { useTranslations } from "next-intl";
import Link from "next/link";
import { styleClasses } from "../helpers/styleClasses";
import styles from "./Navbar.module.scss";
import Logo from "./widgets/Logo";
import UserDropdownWrapper from "./widgets/UserDropdownWrapper";

type Props = Readonly<{
  showBackButton?: boolean;
  showUserMenu?: boolean;
  className?: string;
  [prop: string]: any;
}>;

export default function Navbar({
  showBackButton = false,
  showUserMenu = true,
  className,
  ...props
}: Props) {
  const t = useTranslations("Navbar");
  return (
    <nav {...props} className={styleClasses(styles, "navbar", className || "")}>
      <Link
        href="/"
        title={t("logoLink")}
        className={styleClasses(styles, "logo-link")}
      >
        <Logo className={styleClasses(styles, "logo")} aria-hidden="true" />
      </Link>
      <div className={styleClasses(styles, "menu-wrapper")}>
        {showBackButton && (
          <Link
            href="/"
            aria-hidden="true"
            className={styleClasses(styles, "menu-button")}
          >
            {t("home")}
          </Link>
        )}
        {showUserMenu && <UserDropdownWrapper />}
      </div>
    </nav>
  );
}
