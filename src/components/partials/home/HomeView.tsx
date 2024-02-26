"use client";

import { useEffect, useState } from "react";
import {
  LecturerFilters,
  type Lecturer,
} from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import FixedBanner from "../../widgets/FixedBanner";
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

  return (
    <div className={styleClasses(styles, "view", className || "")} {...props}>
      <FixedBanner className={styleClasses(styles, "show-filters-section")}>
        <Button onClick={() => setFiltersSheetVisible(true)}>Filtry</Button>
      </FixedBanner>

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
