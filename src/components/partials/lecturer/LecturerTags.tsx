import Card from "../../../components/widgets/Card";
import Tag from "../../../components/widgets/Tag";
import { type Tag as TagModel } from "../../../database/models/Tag";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerTags.module.scss";

type Props = Readonly<{
  tags: TagModel[];
  [prop: string]: any;
}>;

export default function LecturerTags({ tags, ...props }: Props) {
  return (
    <Card {...props}>
      <section>
        <h2 className={styleClasses(styles, "visually-hidden")}>Zaměření</h2>
        <ul className={styleClasses(styles, "tag-list")}>
          {tags.map((tag) => (
            <li key={tag.uuid}>
              <Tag
                className={styleClasses(
                  styles,
                  "background-sky-blue",
                  "text-jet",
                )}
              >
                {tag.name}
              </Tag>
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
