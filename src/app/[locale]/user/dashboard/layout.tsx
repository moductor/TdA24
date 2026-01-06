import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import Header from "../../../../components/Header";
import { styleClasses } from "../../../../helpers/styleClasses";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import { redirect } from "../../../../i18n/routing";
import MenuLink, { Link } from "./MenuLink";
import styles from "./layout.module.scss";

export const dynamic = "force-dynamic";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const user = getCurrentUserWithSession();
  if (!user) return redirect("/user/auth/login");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("Dashboard");

  const links: Link[] = [
    {
      title: t("eventsTitle"),
      path: "/user/dashboard/events",
    },
    {
      title: t("accountTitle"),
      path: "/user/dashboard/account",
    },
  ];

  if (user.lecturerId) {
    links.push({
      title: t("lecturerTitle"),
      path: "/user/dashboard/lecturer",
    });
  }

  return (
    <>
      <Header showBackButton={true} showUserMenu={true}>
        <div className={styleClasses(styles, "full-width", "header-wrapper")}>
          <div className={styleClasses(styles, "menu-wrapper")}>
            <ul className={styleClasses(styles, "menu")}>
              {links.map((link, index) => (
                <li key={index}>
                  <MenuLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Header>

      <main className={styleClasses(styles, "content-grid", "content")}>
        {children}
      </main>
    </>
  );
}
