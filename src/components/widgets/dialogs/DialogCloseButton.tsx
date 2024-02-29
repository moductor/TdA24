import { MouseEventHandler } from "react";
import { styleClasses } from "../../../helpers/styleClasses";
import Icon from "../Icon";
import styles from "./DialogCloseButton.module.scss";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  [prop: string]: any;
};

export default function DialogCloseButton({
  onClick,
  className,
  ...props
}: Props) {
  return (
    <button
      onClick={onClick}
      className={styleClasses(styles, "close-button", className || "")}
      {...props}
    >
      <Icon icon="close" />
    </button>
  );
}
