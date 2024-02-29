import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./DialogContent.module.scss";
import DialogContentCustom from "./DialogContentCustom";

type Props = {
  title?: string;
  content?: string;
  className?: string;
  [prop: string]: any;
};

export default function DialogContent({
  title,
  content,
  className,
  ...props
}: Props) {
  return (
    <DialogContentCustom
      className={styleClasses(styles, "content-flow", "custom-margin")}
      {...props}
    >
      {title && (
        <p role="heading" className="title" style={{ fontSize: "1.6rem" }}>
          {title}
        </p>
      )}
      {content && <p>{content}</p>}
    </DialogContentCustom>
  );
}
