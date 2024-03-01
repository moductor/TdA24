import {
  MouseEvent,
  MouseEventHandler,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import Card from "../Card";
import styles from "./Dialog.module.scss";

type Props = Readonly<{
  show: boolean;
  className?: string;
  children?: React.ReactNode;
  onBackdropClick?: MouseEventHandler<HTMLDialogElement>;
  onCancel?: ReactEventHandler<HTMLDialogElement>;
  [prop: string]: any;
}>;

export default function Dialog({
  show,
  className,
  children,
  onBackdropClick,
  onCancel,
  ...props
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current!;

    if (show) {
      document.body.style.setProperty("overflow", "hidden");
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [show]);

  function handleClose() {
    document.body.style.removeProperty("overflow");
  }

  function handleCancel(e: SyntheticEvent<HTMLDialogElement, Event>) {
    e.preventDefault();
    if (onCancel) onCancel(e);
  }

  function handleClick(e: MouseEvent<HTMLDialogElement>) {
    const inDialog =
      (e.target as HTMLElement).closest("[data-dialog-card]") != null;

    if (inDialog) return;

    if (onBackdropClick) onBackdropClick(e);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleCancel}
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
