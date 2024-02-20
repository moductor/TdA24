import { useEffect, useRef, useState } from "react";
import {
  LecturerFilters,
  type Lecturer,
} from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import HomeItem from "./HomeItem";
import styles from "./HomeList.module.scss";
import { fetchLecturers, loadCount } from "./lecturerFetcher";

type Props = Readonly<{
  initialLecturers: Lecturer[];
  filters: LecturerFilters;
  className?: string;
  [prop: string]: any;
}>;

export default function HomeList({
  initialLecturers,
  filters,
  className,
  ...props
}: Props) {
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [lecturers, setLecturers] = useState(initialLecturers);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLecturers(initialLecturers);
    setNoMoreData(false);
  }, [initialLecturers]);

  const loadMore = noMoreData
    ? undefined
    : async () => {
        setLoading(true);

        const data = await fetchLecturers(
          { skip: lecturers.length, limit: loadCount },
          filters,
        );

        setLoading(false);

        if (!data.length) {
          setNoMoreData(true);
          return;
        }

        setLecturers((prevLecturers) => [...prevLecturers, ...data]);
      };

  const content = lecturers.length ? (
    <>
      {lecturers.map(function (lecturer, index, lecturers) {
        return (
          <HomeItem
            key={index}
            itemCount={lecturers.length}
            index={index}
            className={styleClasses(styles, "item")}
            lecturer={lecturer}
            loadMoreCB={loadMore}
          />
        );
      })}

      {loading && (
        <div className={styleClasses(styles, "loading-bar", "item")}>
          <span className={styleClasses(styles, "loading-dot")}></span>
          <span className={styleClasses(styles, "loading-dot")}></span>
          <span className={styleClasses(styles, "loading-dot")}></span>
        </div>
      )}
    </>
  ) : (
    <div className={styleClasses(styles, "empty-state", "item")}>
      Nebyli nalezeni žádní lektoři odpovídající zadání. Prosím, upravte hodnoty
      filtrů.
    </div>
  );

  return (
    <div
      className={styleClasses(styles, "list", className || "")}
      ref={listRef}
      {...props}
    >
      {content}
    </div>
  );
}
