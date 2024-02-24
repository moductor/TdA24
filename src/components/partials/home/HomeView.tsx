"use client";

import { useEffect, useRef, useState } from "react";
import {
  LecturerFilters,
  type Lecturer,
} from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import Button from "../../widgets/forms/Button";
import HomeFilters from "./HomeFilters";
import HomeList from "./HomeList";
import styles from "./HomeView.module.scss";
import Filters from "./filters/Filters";
import { fetchLecturers } from "./lecturerFetcher";

type Props = Readonly<{
  lecturersData: string;
  lecturerFilters: string;
  className?: string;
  [prop: string]: any;
}>;

export default function HomeView({
  lecturersData,
  lecturerFilters,
  className,
  ...props
}: Props) {
  const initialLecturers: Lecturer[] = JSON.parse(lecturersData);
  const initialFilters: LecturerFilters = JSON.parse(lecturerFilters);

  const [lecturers, setLecturers] = useState(initialLecturers);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    (async () => {
      console.log(filters);
      const data = await fetchLecturers(undefined, filters);
      console.log(data);
      setLecturers(data);
    })();
  }, [filters]);

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

    const observer = new IntersectionObserver(([entry]) => {
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
        <Button ref={filtersButtonRef}>Filtry</Button>
      </div>

      <HomeFilters
        visible={filtersSheetVisible}
        onClose={() => setFiltersSheetVisible(false)}
      >
        <Filters
          filters={filters}
          onFiltered={(filters) => setFilters(filters)}
        />
      </HomeFilters>
      <HomeList initialLecturers={lecturers} filters={filters} />
    </div>
  );
}
