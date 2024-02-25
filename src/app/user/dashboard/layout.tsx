import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "../../../components/Header";
import { styleClasses } from "../../../helpers/styleClasses";
import { getUserContext } from "../../../helpers/userContext";
import MenuLink, { Link } from "./MenuLink";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const user = getUserContext();
  if (!user) redirect("/user/auth/login");

  const links: Link[] = [
    {
      title: "Rezervované schůzky",
      path: "/user/dashboard/events",
    },
    {
      title: "Uživatelská nastavení",
      path: "/user/dashboard/account",
    },
    {
      title: "Profil lektora",
      path: "/user/dashboard/lecturer",
    },
  ];

  return (
    <>
      <Header showBackButton={true} showUserMenu={true}>
        {user.lecturerId && (
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
        )}
      </Header>

      <main className="content-grid">{children}</main>
    </>
  );
}
