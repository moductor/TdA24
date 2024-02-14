import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Card from "../../../components/widgets/Card";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerBio.module.scss";

type Props = Readonly<{
  content: string;
  [prop: string]: any;
}>;

export default function LecturerBio({ content, ...props }: Props) {
  return (
    <Card {...props}>
      <section className={styleClasses(styles, "bio", "content-flow")}>
        <h2 className="title-2">O mně</h2>
        {parse(sanitizeHtml(content))}
      </section>
    </Card>
  );
}
