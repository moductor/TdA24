import Image from "next/image";
import { styleClasses } from "../../helpers/styleClasses";
import styles from "./ProfilePicture.module.scss";

type Props = {
  src?: string;
  className?: string;
};

export default function ProfilePicture({ src, className }: Props) {
  return (
    <Image
      src={src || "/images/profile-placeholder.svg"}
      alt=""
      width={512}
      height={512}
      className={styleClasses(styles, "picture", className || "")}
    />
  );
}
