import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Card from "../../../components/widgets/Card";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerBio.module.scss";

type Props = Readonly<{
  content: string;
  aboutMeText: string;
  [prop: string]: any;
}>;

export default function LecturerBio({ content, aboutMeText, ...props }: Props) {
  return (
    <Card {...props}>
      <section className={styleClasses(styles, "bio", "content-flow")}>
        <h2 className="title-2">{aboutMeText}</h2>
        {parse(sanitizeHtml(content))}
      </section>
    </Card>
  );
}
