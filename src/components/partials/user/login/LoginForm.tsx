"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AuthQuery } from "../../../../app/api/user/auth/AuthQuery";
import { getEndpoint } from "../../../../helpers/endpointUrl";
import { styleClasses } from "../../../../helpers/styleClasses";
import { Link } from "../../../../i18n/routing";
import LoadingBar from "../../../widgets/LoadingBar";
import Tag from "../../../widgets/Tag";
import Button from "../../../widgets/forms/Button";
import CheckBoxRow from "../../../widgets/forms/CheckBoxRow";
import TextFieldRow from "../../../widgets/forms/TextFieldRow";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [messageIsError, setMessageIsError] = useState(true);

  const t = useTranslations("Auth.login");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const registered = params.get("registered") !== null;
    if (!registered) return;
    setMessage(t("registrationSuccess"));
    setMessageIsError(false);
  }, [t]);

  async function onSubmit(form: FormData) {
    setIsLoading(true);
    setMessage(undefined);
    setMessageIsError(true);

    const username = form.get("username")!.toString();
    const password = form.get("password")!.toString();
    const remember = Boolean(form.get("remember"));

    const query: AuthQuery = {
      username,
      password,
      keepLoggedIn: remember,
    };

    const res = await fetch(getEndpoint("/api/user/auth"), {
      method: "POST",
      body: JSON.stringify(query),
    });

    if (res.status == 200) {
      window.location.reload();
      return;
    }

    setIsLoading(false);

    if (res.status == 404) {
      setMessage(t("loginError"));
    }
  }

  return (
    <form action={onSubmit} className={styleClasses(styles, "form")}>
      <h1 className={styleClasses(styles, "title", "title-2")}>{t("title")}</h1>

      {message && (
        <div
          className={styleClasses(
            styles,
            "error-box",
            !messageIsError ? "info" : "",
          )}
        >
          {message}
        </div>
      )}

      <TextFieldRow
        type="text"
        name="username"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        {t("username")}
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="password"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        {t("password")}
      </TextFieldRow>

      <div className={styleClasses(styles, "submit-row", "form-field")}>
        <CheckBoxRow name="remember" className={styleClasses(styles, "check")}>
          {t("remember")}
        </CheckBoxRow>
        <Button>{t("loginButton")}</Button>
      </div>

      <p className={styleClasses(styles, "footer")}>
        {t("footer")}{" "}
        <Link href="/user/auth/register">
          <Tag className="text-jet background-sky-blue">
            {t("registerLink")}
          </Tag>
        </Link>
      </p>

      <div
        className={styleClasses(styles, "loading-pane")}
        data-visible={isLoading ? "visible" : undefined}
      >
        <LoadingBar />
      </div>
    </form>
  );
}
