"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthQuery } from "../../../../app/api/user/auth/AuthQuery";
import { getEndpoint } from "../../../../helpers/endpointUrl";
import { styleClasses } from "../../../../helpers/styleClasses";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const registered = params.get("registered") !== null;
    if (!registered) return;
    setMessage("Registrace proběhla úspěšně. Nyní se můžete přihlásit.");
    setMessageIsError(false);
  }, []);

  async function onSubmit(form: FormData) {
    setIsLoading(true);
    setMessage(undefined);
    setMessageIsError(true);

    const usernameOrEmail = form.get("usernameOrEmail")!.toString();
    const password = form.get("password")!.toString();
    const remember = Boolean(form.get("remember"));

    const query: AuthQuery = {
      usernameOrEmail,
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
      setMessage("Zadané údaje nejsou správné. Zkuste to znovu.");
    }
  }

  return (
    <form action={onSubmit} className={styleClasses(styles, "form")}>
      <h1 className={styleClasses(styles, "title", "title-2")}>Přihlášení</h1>

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
        name="usernameOrEmail"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Uživatelské jméno nebo email
      </TextFieldRow>

      <TextFieldRow
        type="password"
        name="password"
        required={true}
        className={styleClasses(styles, "form-field")}
      >
        Heslo
      </TextFieldRow>

      <div className={styleClasses(styles, "submit-row", "form-field")}>
        <CheckBoxRow name="remember" className={styleClasses(styles, "check")}>
          Zapamatovat si údaje
        </CheckBoxRow>
        <Button>Přihlásit se</Button>
      </div>

      <p className={styleClasses(styles, "footer")}>
        Ještě nemáte účet?{" "}
        <Link href="/user/auth/register">
          <Tag className="text-jet background-sky-blue">Zaregistrujte se!</Tag>
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
