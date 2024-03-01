"use client";

import { useEffect, useState } from "react";
import FixedBanner from "../../../../components/widgets/FixedBanner";
import ResultIndicator from "../../../../components/widgets/ResultIndicator";
import Button from "../../../../components/widgets/forms/Button";
import TextFieldRow from "../../../../components/widgets/forms/TextFieldRow";
import { User } from "../../../../database/models/User";
import { styleClasses } from "../../../../helpers/styleClasses";
import DashboardSection from "../DashboardSection";
import InputList from "../InputList";
import PageHeader from "../PageHeader";
import styles from "../lecturer/PageContent.module.scss";

type Props = {
  user: User;
  getUser: any;
};

let clearResultTimeout: any;

export default function PageContent({ user, getUser }: Props) {
  const [userState, setUserState] = useState(user);

  const [result, setResult] = useState<boolean | null | undefined>(undefined);
  const sending = result === null;

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(true);
  }, [userState]);

  useEffect(() => {
    if (!hasChanged) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "");
    }

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  }, [hasChanged]);

  async function save() {
    if (sending) return;
    clearTimeout(clearResultTimeout);
    setResult(null);

    const data = { ...userState };

    Object.keys(data)
      .filter((key) => (data as any)[key] === undefined)
      .forEach((key) => ((data as any)[key] = null));

    const res = await fetch(`/api/user/${userState.uuid}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setResult(res.status == 200);
    clearResultTimeout = setTimeout(() => setResult(undefined), 2000);
    setHasChanged(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <PageHeader title="Uživatelské nastavení">
        <FixedBanner>
          <div className={styleClasses(styles, "save-section")}>
            <Button>Uložit změny</Button>
            <ResultIndicator result={result} />
          </div>
        </FixedBanner>
      </PageHeader>

      <DashboardSection title="Základní údaje">
        <div className={styleClasses(styles, "metadata")}>
          <div className={styleClasses(styles, "inputs")}>
            <InputList>
              <TextFieldRow
                type="text"
                disabled={sending}
                value={userState.username}
                onChange={(e) =>
                  setUserState((user) => ({
                    ...user,
                    username: e.target.value,
                  }))
                }
              >
                Uživatelské jméno
              </TextFieldRow>

              <TextFieldRow
                type="email"
                disabled={sending}
                value={userState.email}
                onChange={(e) =>
                  setUserState((user) => ({
                    ...user,
                    email: e.target.value || undefined,
                  }))
                }
              >
                Email
              </TextFieldRow>
              <TextFieldRow
                type="tel"
                disabled={sending}
                pattern="(\+420|00420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}"
                value={userState.telephone}
                onChange={(e) =>
                  setUserState((user) => ({
                    ...user,
                    telephone: e.target.value || undefined,
                  }))
                }
              >
                Telefonní číslo
              </TextFieldRow>
            </InputList>
          </div>
        </div>
      </DashboardSection>
    </form>
  );
}
