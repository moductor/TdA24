import Card from "../../../components/widgets/Card";
import {
  getNameString,
  type Lecturer as LecturerModel,
} from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import LecturerMetadata from "../lecturer/LecturerMetadata";
import LecturerPortrait from "../lecturer/LecturerPortrait";
import styles from "./HomeItem.module.scss";

type Props = Readonly<{
  lecturer: LecturerModel;
  className?: string;
  [prop: string]: any;
}>;

export default function HomeItem({ lecturer, className, ...props }: Props) {
  return (
    <div
      data-lecturer-item={lecturer.uuid}
      className={styleClasses(styles, "lecturer-item", className || "")}
      {...props}
    >
      <LecturerPortrait
        portrait={lecturer.picture_url}
        className={styleClasses(styles, "portrait")}
      />

      <LecturerMetadata
        name={getNameString(lecturer)}
        claim={lecturer.claim}
        price={lecturer.price_per_hour}
        location={lecturer.location}
        useH1={false}
        className={styleClasses(styles, "metadata")}
      />

      <a
        href={`/lecturer/${lecturer.uuid}`}
        className={styleClasses(styles, "link")}
        aria-label="Přejít na stránku lektora"
      >
        <Card className={styleClasses(styles, "card")}>Zobrazit více</Card>
      </a>
    </div>
  );
}
