import Card from "../../../components/widgets/Card";
import Tag from "../../../components/widgets/Tag";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerMetadata.module.scss";

type Props = Readonly<{
  name: string;
  claim?: string;
  location?: string;
  price?: number;
  useH1?: boolean;
  className?: string;
  [prop: string]: any;
}>;

export default function LecturerMetadata({
  name,
  claim,
  location,
  price,
  useH1 = false,
  className,
  ...props
}: Props) {
  return (
    <Card
      className={styleClasses(styles, "metadata", className || "")}
      {...props}
    >
      {useH1 ? (
        <h1 className={styleClasses(styles, "title-1")}>{name}</h1>
      ) : (
        <h2 className={styleClasses(styles, "title-2")}>{name}</h2>
      )}
      {claim && <p className={styleClasses(styles, "claim")}>{claim}</p>}

      <div className={styleClasses(styles, "tag-list")}>
        {location && (
          <Tag className="background-sky-blue text-jet">
            <p>
              <span className="visually-hidden">Umístění:</span>
              <span>{location}</span>
            </p>
          </Tag>
        )}

        {price && (
          <Tag className="background-sunglow text-jet">
            <p>
              <span className="visually-hidden">Cena za hodinu:</span>
              <span>{price} Kč / hod</span>
            </p>
          </Tag>
        )}
      </div>
    </Card>
  );
}
