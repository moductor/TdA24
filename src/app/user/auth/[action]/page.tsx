import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "../../../../components/Navbar";
import LoginForm from "../../../../components/partials/user/login/LoginForm";
import RegisterForm from "../../../../components/partials/user/login/RegisterForm";
import BackgroundWrapper from "../../../../components/widgets/BackgroundWrapper";
import Card from "../../../../components/widgets/Card";
import { styleClasses } from "../../../../helpers/styleClasses";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import styles from "./page.module.scss";

type Params = {
  action: string;
};

type Props = {
  params: Params;
};

export default function Page({ params }: Props) {
  const action = params.action;

  if (getCurrentUserWithSession()) redirect("/user/dashboard");

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
