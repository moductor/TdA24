import { MouseEvent, MouseEventHandler, useEffect, useRef } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import Card from "../Card";
import styles from "./Dialog.module.scss";

type Props = Readonly<{
  show: boolean;
  className?: string;
  children?: React.ReactNode;
  onBackdropClick?: MouseEventHandler<HTMLDialogElement>;
  [prop: string]: any;
}>;

export default function Dialog({
  show,
  className,
  children,
  onBackdropClick,
  ...props
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current!;

    if (show) {
      document.body.style.setProperty("overflow", "hidden");
      dialog.showModal();
    } else {
      document.body.style.removeProperty("overflow");
      dialog.close();
    }
  }, [show]);

  function handleClick(e: MouseEvent<HTMLDialogElement>) {
    const inDialog =
      (e.target as HTMLElement).closest("[data-dialog-card]") != null;

    if (inDialog) return;

    if (onBackdropClick) onBackdropClick(e);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      className={styleClasses(styles, "dialog", className || "")}
      {...props}
    >
      <Card
        className={styleClasses(styles, "card")}
        showEffects={false}
        data-dialog-card
      >
        {children}
      </Card>
    </dialog>
  );
}
