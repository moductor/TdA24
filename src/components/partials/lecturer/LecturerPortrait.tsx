import Image from "next/image";
import { Lecturer } from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerPortrait.module.scss";

type Props = Readonly<{
  lecturer: Lecturer;
  className?: string;
  [prop: string]: any;
}>;

export default function LecturerPortrait({
  lecturer,
  className,
  ...props
}: Props) {
  return lecturer.picture_url ? (
    <Image // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src={lecturer.picture_url!}
      alt=""
      width={512}
      height={512}
      {...props}
    />
  ) : (
    <Image // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src={`/api/profile-picture/lecturer/${lecturer.uuid}`}
      alt=""
      width={512}
      height={512}
      {...props}
    />
  );
}
