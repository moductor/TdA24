"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { User } from "../../database/models/User";
import { styleClasses } from "../../helpers/styleClasses";
import { deleteUserSession } from "../../helpers/userSession";
import ProfilePicture from "./ProfilePicture";
import styles from "./UserDropdown.module.scss";
import Dialog from "./dialogs/Dialog";
import DialogButtons from "./dialogs/DialogButtons";
import DialogCloseButton from "./dialogs/DialogCloseButton";
import DialogContent from "./dialogs/DialogContent";
import Button from "./forms/Button";

type Props = {
  user?: User;
};

export default function UserDropdown({ user }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [dialogModalVisible, setDialogModalVisible] = useState(false);

  function showDropdown() {
    setIsVisible((prev) => !prev);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const dropdown = dropdownRef.current;
      if (!dropdown) return;

      const visible = dropdown.getAttribute("data-visible") == "true";
      if (!visible) return;

      const wrapper = (e.target as Element).closest(`.${styles["wrapper"]}`);
      if (wrapper) return;

      setIsVisible(false);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!user) {
    return (
      <div>
        <Button href="/user/auth/login">Přihlásit se</Button>
      </div>
    );
  }

  return (
    <div className={styleClasses(styles, "wrapper")}>
      <span
        className={styleClasses(styles, "profile-button")}
        onClick={showDropdown}
      >
        <ProfilePicture src={`/api/profile-picture/user/${user.uuid}`} />
      </span>
      <div
        className={styleClasses(styles, "dropdown-wrapper")}
        data-visible={isVisible}
        ref={dropdownRef}
      >
        <div className={styleClasses(styles, "dropdown")}>
          <div className={styleClasses(styles, "user-item")}>
            <p>{user.name || user.username}</p>
            {user.name && <small>{user.username}</small>}
          </div>
          <hr />
          <Link
            className={styleClasses(styles, "button-item")}
            href="/user/dashboard"
          >
            Nástěnka
          </Link>
          {user.lecturerId && (
            <Link
              className={styleClasses(styles, "button-item")}
              href={`/lecturer/${user.lecturerId}`}
            >
              Profil
            </Link>
          )}
          <button
            className={styleClasses(styles, "button-item", "text-error")}
            onClick={() => setDialogModalVisible(true)}
          >
            Odhlásit se
          </button>
        </div>
      </div>

      <Dialog
        show={dialogModalVisible}
        onBackdropClick={() => setDialogModalVisible(false)}
        onCancel={() => setDialogModalVisible(false)}
      >
        <DialogCloseButton onClick={() => setDialogModalVisible(false)} />
        <DialogContent
          title="Odhlásit se"
          content="Opravdu se chcete odhlásit?"
        />
        <DialogButtons>
          <Button
            onClick={() => setDialogModalVisible(false)}
            variant="secondary"
          >
            Zrušit
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              deleteUserSession();
              window.location.reload();
              setDialogModalVisible(false);
            }}
          >
            Odhlásit se
          </Button>
        </DialogButtons>
      </Dialog>
    </div>
  );
}
