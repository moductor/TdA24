import { useEffect, useRef } from "react";
import Card from "../../../components/widgets/Card";
import {
  getNameString,
  type Lecturer as LecturerModel,
} from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import { Link } from "../../../i18n/routing";
import LecturerMetadata from "../lecturer/LecturerMetadata";
import LecturerPortrait from "../lecturer/LecturerPortrait";
import styles from "./HomeItem.module.scss";

type Props = Readonly<{
  lecturer: LecturerModel;
  index: number;
  itemCount: number;
  className?: string;
  loadMoreCB?: () => void;
  t: { showMore: string; lecturerLink: string };
  [prop: string]: any;
}>;

export default function HomeItem({
  lecturer,
  index,
  itemCount,
  className,
  loadMoreCB,
  t,
  ...props
}: Props) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current!;
    const reversedIndex = itemCount - 1 - index;

    if (!loadMoreCB) return;

    // Just for the last element.
    if (reversedIndex != 0) return;

    const observer = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      loadMoreCB();
    });
    observer.observe(item);

    return () => {
      observer.unobserve(item);
    };
  }, [index, itemCount, loadMoreCB]);

  return (
    <div
      data-lecturer-item={lecturer.uuid}
      className={styleClasses(styles, "lecturer-item", className || "")}
      ref={itemRef}
      {...props}
    >
      <a href={`/lecturer/${lecturer.uuid}`}>
        <LecturerPortrait
          lecturer={lecturer}
          className={styleClasses(styles, "portrait")}
        />
      </a>

      <LecturerMetadata
        href={`/lecturer/${lecturer.uuid}`}
        name={getNameString(lecturer)}
        claim={lecturer.claim}
        price={lecturer.price_per_hour}
        location={lecturer.location}
        onLecturerPage={false}
        className={styleClasses(styles, "metadata")}
      />

      <Link
        href={`/lecturer/${lecturer.uuid}`}
        className={styleClasses(styles, "link")}
        aria-label={t.lecturerLink}
      >
        <Card className={styleClasses(styles, "card")}>{t.showMore}</Card>
      </Link>
    </div>
  );
}
