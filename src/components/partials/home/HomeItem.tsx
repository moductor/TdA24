import Link from "next/link";
import { useEffect, useRef } from "react";
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
  index: number;
  itemCount: number;
  className?: string;
  loadMoreCB?: () => void;
  [prop: string]: any;
}>;

export default function HomeItem({
  lecturer,
  index,
  itemCount,
  className,
  loadMoreCB,
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
      console.log("Observing!", entry.isIntersecting);

      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      loadMoreCB();
    });
    observer.observe(item);

    return () => {
      observer.unobserve(item);
    };
  }, [itemCount, loadMoreCB]);

  return (
    <div
      data-lecturer-item={lecturer.uuid}
      className={styleClasses(styles, "lecturer-item", className || "")}
      ref={itemRef}
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

      <Link
        href={`/lecturer/${lecturer.uuid}`}
        className={styleClasses(styles, "link")}
        aria-label="Přejít na stránku lektora"
      >
        <Card className={styleClasses(styles, "card")}>Zobrazit více</Card>
      </Link>
    </div>
  );
}
