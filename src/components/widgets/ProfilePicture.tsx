import { styleClasses } from "../../helpers/styleClasses";
import styles from "./ProfilePicture.module.scss";

type Props = {
  src?: string;
};

export default function ProfilePicture({ src }: Props) {
  return <img src={src} alt="" className={styleClasses(styles, "picture")} />;
}
