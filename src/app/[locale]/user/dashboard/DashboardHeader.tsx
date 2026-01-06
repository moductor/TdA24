"use client";

import { useTranslations } from "next-intl";
import Header from "../../../../components/Header";
import { User } from "../../../../database/models/User";
import { styleClasses } from "../../../../helpers/styleClasses";
import MenuLink, { Link } from "./MenuLink";
import styles from "./layout.module.scss";

export default function DashboardHeader({ user }: { user: User }) {
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
  );
}
