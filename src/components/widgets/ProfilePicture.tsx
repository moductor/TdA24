import Image from "next/image";
import { styleClasses } from "../../helpers/styleClasses";
import styles from "./ProfilePicture.module.scss";

type Props = {
  src?: string;
};

export default function ProfilePicture({ src }: Props) {
  return (
    <Image
      src={src || ""}
      alt=""
      width={512}
      height={512}
      className={styleClasses(styles, "picture")}
    />
  );
}
