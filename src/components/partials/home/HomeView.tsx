"use client";

import { useEffect, useRef, useState } from "react";
import { type Lecturer } from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import HomeFilters from "./HomeFilters";
import HomeList from "./HomeList";
import styles from "./HomeView.module.scss";
import Filters from "./filters/Filters";

type Props = Readonly<{
  lecturersData: string;
  className?: string;
  [prop: string]: any;
}>;

export default function HomeView({
  lecturersData,
  className,
  ...props
}: Props) {
  const lecturers: Lecturer[] = JSON.parse(lecturersData);

  const [filteredLecturers, setFilteredLecturers] = useState(lecturers);

  const [filtersSheetVisible, setFiltersSheetVisible] = useState(false);

  const filtersBannerRef = useRef<HTMLDivElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const filtersBanner = filtersBannerRef.current!;
    const filtersButton = filtersButtonRef.current!;

    const showFilters = () => setFiltersSheetVisible(true);
    filtersButton.addEventListener("click", showFilters);

    const fixedFiltersBanner = filtersBanner.cloneNode(true) as HTMLElement;
    fixedFiltersBanner.classList.add(styles["fixed"]);
    fixedFiltersBanner.setAttribute("aria-hidden", "true");
    filtersBanner.parentElement?.insertBefore(
      fixedFiltersBanner,
      filtersBanner.nextSibling,
    );

    const fixedFiltersButton = fixedFiltersBanner.firstChild as HTMLElement;
    fixedFiltersButton.addEventListener("click", showFilters);
    fixedFiltersButton.setAttribute("tabindex", "-1");

    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      fixedFiltersBanner.classList.toggle(
        styles["visible"],
        !entry.isIntersecting,
      );
    });
    observer.observe(filtersBanner);

    return () => {
      filtersButton.removeEventListener("click", showFilters);
      fixedFiltersButton.removeEventListener("click", showFilters);
      observer.unobserve(filtersBanner);
    };
  }, []);

  return (
    <div className={styleClasses(styles, "view", className || "")} {...props}>
      <div
        className={styleClasses(styles, "show-filters-section")}
        ref={filtersBannerRef}
      >
        <button
          className={styleClasses(styles, "filters-button")}
          ref={filtersButtonRef}
        >
          Filtry
        </button>
      </div>

      <HomeFilters
        visible={filtersSheetVisible}
        onClose={() => setFiltersSheetVisible(false)}
      >
        <Filters
          lecturers={lecturers}
          onFiltered={(filtered) => setFilteredLecturers(filtered)}
        />
      </HomeFilters>
      <HomeList lecturers={filteredLecturers} />
    </div>
  );
}
