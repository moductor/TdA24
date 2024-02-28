import { useEffect, useRef } from "react";
import { styleClasses } from "../../helpers/styleClasses";
import Card from "./Card";
import styles from "./Dialog.module.scss";

type Props = Readonly<{
  show: boolean;
  className?: string;
  children: React.ReactNode;
  [prop: string]: any;
}>;

export default function Dialog({ show, className, children, ...props }: Props) {
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
            {children}
          </Card>
        </dialog>
      )}
    </>
  );
}
