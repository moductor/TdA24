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
    <img // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src={lecturer.picture_url!}
      alt=""
      {...props}
    />
  ) : (
    <img // eslint-disable-line
      className={styleClasses(styles, "portrait", className || "")}
      src={`/api/profile-picture/lecturer/${lecturer.uuid}`}
      alt=""
      {...props}
    />
  );
}
