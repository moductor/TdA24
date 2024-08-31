"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { RegisterQuery } from "../../../../app/api/user/register/RegisterQuery";
import { UserInsertErrorResponse } from "../../../../database/models/User";
import { getEndpoint } from "../../../../helpers/endpointUrl";
import { styleClasses } from "../../../../helpers/styleClasses";
import LoadingBar from "../../../widgets/LoadingBar";
import Tag from "../../../widgets/Tag";
import Button from "../../../widgets/forms/Button";
import TextFieldRow from "../../../widgets/forms/TextFieldRow";
import styles from "./LoginForm.module.scss";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const t = useTranslations("Auth.register");

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const username = data.get("username")!.toString();
    const email = data.get("email")!.toString();
    const password = data.get("password")!.toString();
    const passwordCheck = data.get("passwordCheck")!.toString();

    const regularExpression =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (!regularExpression.test(password)) {
      setIsLoading(false);
      setErrorMessage(t("passwordError"));
      return;
    }

    if (password !== passwordCheck) {
      setIsLoading(false);
      setErrorMessage(t("passwordMatchError"));
      return;
    }

    const query: RegisterQuery = { username, email, password };

    const res = await fetch(getEndpoint("/api/user/register"), {
      method: "POST",
      body: JSON.stringify(query),
    });

    if (res.status == 201) {
      window.location.assign("/user/auth/login?registered");
      return;
    }

    setIsLoading(false);

    if (res.status == 409) {
      const resData = (await res.json()) as UserInsertErrorResponse;
      const conflict = resData.conflict;

      if (conflict?.username && conflict?.email) {
        setErrorMessage(t("conflictUsernameEmailError"));
        return;
      }

      if (conflict?.username) {
        setErrorMessage(t("conflictUsernameError"));
        return;
      }

      if (conflict?.email) {
        setErrorMessage(t("conflictEmailError"));
        return;
      }
    }

    setErrorMessage(t("generalError"));
  }

  return (
    <form action={onSubmit} className={styleClasses(styles, "form")}>
      <h1 className={styleClasses(styles, "title", "title-2")}>{t("title")}</h1>

      {errorMessage && (
        <div className={styleClasses(styles, "error-box")}>{errorMessage}</div>
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
        type="email"
        name="email"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        {t("email")}
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="password"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        {t("password")}
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="passwordCheck"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        {t("passwordCheck")}
      </TextFieldRow>

      <div className={styleClasses(styles, "submit-row", "form-field")}>
        <Button>{t("registerButton")}</Button>
      </div>

      <p className={styleClasses(styles, "footer")}>
        {t("footer")}{" "}
        <Link href="/user/auth/login">
          <Tag className="text-jet background-sky-blue">{t("loginLink")}</Tag>
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
