import { styleClasses } from "../helpers/styleClasses";
import styles from "./Navbar.module.scss";
import Logo from "./widgets/Logo";

type Props = Readonly<{
  showBackButton?: boolean;
  className?: string;
  [prop: string]: any;
}>;

export default function Navbar({
  showBackButton = false,
  className,
  ...props
}: Props) {
  return (
    <nav {...props} className={styleClasses(styles, "navbar", className || "")}>
      <a href="/" title="Přejít na domovskou stránku">
        <Logo className={styleClasses(styles, "logo")} aria-hidden="true" />
      </a>
      {showBackButton && (
        <a
          href="/"
          aria-hidden="true"
          className={styleClasses(styles, "menu-button")}
        >
          Domů
        </a>
      )}
    </nav>
  );
}
