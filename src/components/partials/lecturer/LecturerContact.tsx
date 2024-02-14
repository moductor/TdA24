import Card from "../../../components/widgets/Card";
import Icon from "../../../components/widgets/Icon";
import { type ContactInfo } from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./LecturerContact.module.scss";

type Props = Readonly<{
  contact: ContactInfo;
  [prop: string]: any;
}>;

export default function LecturerContact({ contact, ...props }: Props) {
  return (
    <Card {...props}>
      <section className={styleClasses(styles, "contact", "content-flow")}>
        <h2 className="title-2">Kontakt</h2>

        <h3 className="visually-hidden">Telefonní čísla</h3>
        <ul className={styleClasses(styles, "contact-list")}>
          <Icon aria-hidden="true" icon="phone" />
          {contact.telephone_numbers.map((telephone) => (
            <li key={telephone}>
              <a className="unstyled-link" href={`tel:${telephone}`}>
                {telephone}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="visually-hidden">Emailové adresy</h3>
        <ul className={styleClasses(styles, "contact-list")}>
          <Icon aria-hidden="true" icon="email" />
          {contact.emails.map((email) => (
            <li key={email}>
              <a className="unstyled-link" href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
