import { useEffect, useRef } from "react";
import { styleClasses } from "../../helpers/styleClasses";
import Card from "./Card";
import styles from "./Dialog.module.scss";
import Button from "./forms/Button";

type Props = Readonly<{
  show: boolean;
  text: string;
  hideDialogModal: any;
  onAccept: any;
  onDecline?: any;
  acceptBtnText?: string;
  declienBtnText?: string;
  className?: string;
  [prop: string]: any;
}>;

export default function Dialog({
  show = false,
  text,
  acceptBtnText = "Ano",
  declienBtnText = "Ne",
  hideDialogModal,
  onAccept,
  className,
  ...props
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) dialogRef.current?.showModal();
    else {
      dialogRef.current?.close();
    }
  }, [show]);
  return (
    <>
      {show && (
        <dialog
          ref={dialogRef}
          className={styleClasses(styles, "dialog", className || "")}
          {...props}
        >
          <Card className={styleClasses(styles, "dialog-card")}>
            <div className={styleClasses(styles, "dialog-text")}>{text}</div>
            <div className={styleClasses(styles, "dialog-btns")}>
              <Button
                variant="destructive"
                onClick={async () => {
                  onAccept();
                  hideDialogModal();
                  document.querySelector("body")!.style.overflow = "";
                  dialogRef.current?.close();
                }}
              >
                {acceptBtnText}
              </Button>
              <Button
                onClick={() => {
                  hideDialogModal();
                  document.querySelector("body")!.style.overflow = "";
                  dialogRef.current?.close();
                }}
              >
                {declienBtnText}
              </Button>
            </div>
          </Card>
        </dialog>
      )}
    </>
  );
}
