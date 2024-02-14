import { type Lecturer } from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import HomeItem from "./HomeItem";
import styles from "./HomeList.module.scss";

type Props = Readonly<{
  lecturers: Lecturer[];
  className?: string;
  [prop: string]: any;
}>;

export default function HomeList({ lecturers, className, ...props }: Props) {
  let content = (
    <div className={styleClasses(styles, "empty-state", "item")}>
      Nebyli nalezeni žádní lektoři odpovídající zadání. Prosím, upravte hodnoty
      filtrů.
    </div>
  );

  if (lecturers.length) {
    content = (
      <>
        {lecturers.map((lecturer) => (
          <HomeItem
            key={lecturer.uuid}
            className={styleClasses(styles, "item")}
            lecturer={lecturer}
          />
        ))}
      </>
    );
  }

  return (
    <div className={styleClasses(styles, "list", className || "")} {...props}>
      {content}
    </div>
  );
}
