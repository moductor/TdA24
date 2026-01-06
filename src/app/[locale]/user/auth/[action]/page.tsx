import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "../../../../../components/Navbar";
import LoginForm from "../../../../../components/partials/user/login/LoginForm";
import RegisterForm from "../../../../../components/partials/user/login/RegisterForm";
import BackgroundWrapper from "../../../../../components/widgets/BackgroundWrapper";
import Card from "../../../../../components/widgets/Card";
import { styleClasses } from "../../../../../helpers/styleClasses";
import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import { redirect } from "../../../../../i18n/routing";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

type Params = {
  action: string;
  locale: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const action = params.action;

  if (await getCurrentUserWithSession()) {
    return redirect({ href: "/user/dashboard", locale: params.locale });
  }

  function wrap(children?: ReactNode) {
    return (
      <BackgroundWrapper>
        <main className={styleClasses(styles, "content-grid")}>
          <div className={styleClasses(styles, "wrapper")}>
            <Navbar showBackButton={true} showUserMenu={false} />
            <div className={styleClasses(styles, "content")}>
              <Card className={styleClasses(styles, "card")}>{children}</Card>
            </div>
          </div>
        </main>
      </BackgroundWrapper>
    );
  }

  if (action == "register") {
    return wrap(<RegisterForm />);
  }

  if (action == "login") {
    return wrap(<LoginForm />);
  }

  notFound();
}
