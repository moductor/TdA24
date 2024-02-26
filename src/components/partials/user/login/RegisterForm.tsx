"use client";

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
      setErrorMessage(
        "Heslo musí obsahovat nejméně 8 znaků, velká a malá písmena, alespoň 1 číslo a speciální znak!",
      );
      return;
    }

    if (password !== passwordCheck) {
      setIsLoading(false);
      setErrorMessage("Hesla se neshodují!");
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
        setErrorMessage("Zadané uživatelské jméno a email už existují.");
        return;
      }

      if (conflict?.username) {
        setErrorMessage("Zadané uživatelské jméno už existuje.");
        return;
      }

      if (conflict?.email) {
        setErrorMessage("Zadaný email už existuje.");
        return;
      }
    }

    setErrorMessage("Při registraci došlo k chybě.");
  }

  return (
    <form action={onSubmit} className={styleClasses(styles, "form")}>
      <h1 className={styleClasses(styles, "title", "title-2")}>Registrace</h1>

      {errorMessage && (
        <div className={styleClasses(styles, "error-box")}>{errorMessage}</div>
      )}

      <TextFieldRow
        type="text"
        name="username"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Uživatelské jméno
      </TextFieldRow>

      <TextFieldRow
        type="email"
        name="email"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Email
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="password"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Heslo
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="passwordCheck"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Kontrola hesla
      </TextFieldRow>

      <div className={styleClasses(styles, "submit-row", "form-field")}>
        <Button>Zaregistrovat se</Button>
      </div>

      <p className={styleClasses(styles, "footer")}>
        Již máte účet?{" "}
        <Link href="/user/auth/login">
          <Tag className="text-jet background-sky-blue">Přihlaste se!</Tag>
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
