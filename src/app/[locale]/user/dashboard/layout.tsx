import { ReactNode } from "react";
import { styleClasses } from "../../../../helpers/styleClasses";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import { redirect } from "../../../../i18n/routing";
import DashboardHeader from "./DashboardHeader";
import styles from "./layout.module.scss";

export const dynamic = "force-dynamic";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const locale = (await params).locale;
  const user = await getCurrentUserWithSession();
  if (!user) return redirect({ href: "/user/auth/login", locale });

  return (
    <>
      <DashboardHeader user={user} />

      <main className={styleClasses(styles, "content-grid", "content")}>
        {children}
      </main>
    </>
  );
}
