import { useRef } from "react";
import type { Lecturer } from "../../../../models/Lecturer";

import FilterCategory from "./FilterCategory.tsx";
import FilterVariantOptions, {
  type Item as OptionsItem,
} from "./variants/FilterVariantOptions.tsx";

export default () => {
  const lecturersRef = useRef(loadLecturers());
  const lecturers = lecturersRef.current;

  const prices = getPriceRange(lecturers);
  const locations = getLocations(lecturers);
  const tags = getTags(lecturers);

  return (
    <>
      <FilterCategory title="Cena" expanded={true}>
        <p>
          {prices.min} až {prices.max}
        </p>
      </FilterCategory>

      <FilterCategory title="Lokace" expanded={true}>
        <FilterVariantOptions values={locations} />
      </FilterCategory>

      <FilterCategory title="Zaměření">
        <FilterVariantOptions values={tags} />
      </FilterCategory>
    </>
  );
};

const loadLecturers = () => {
  const dataElement = document.getElementById("lecturersData") as HTMLElement;
  const dataString = dataElement.innerHTML;
  const data = JSON.parse(dataString) as Lecturer[];
  return data;
};

const getPriceRange = (lecturers: Lecturer[]) => {
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  lecturers.forEach((lecturer) => {
    if (!lecturer.price_per_hour) return;

    if (!minPrice || minPrice > lecturer.price_per_hour) {
      minPrice = lecturer.price_per_hour;
    }

    if (!maxPrice || maxPrice < lecturer.price_per_hour) {
      maxPrice = lecturer.price_per_hour;
    }
  });

  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 2000;

  return { min: minPrice, max: maxPrice };
};

const getLocations = (lecturers: Lecturer[]): OptionsItem[] => {
  return lecturers
    .filter((lecturer) => lecturer.location)
    .map((lecturer) => ({
      value: lecturer.location as string,
      selected: false,
    }));
};

const getTags = (lecturers: Lecturer[]): OptionsItem[] => {
  const tags: OptionsItem[] = [];
  lecturers.forEach((lecturer) => {
    lecturer.tags?.forEach((tag) => {
      const foundItem = tags.find((e) => e.value == tag.name);
      if (foundItem) return;

      tags.push({ value: tag.name, selected: false });
    });
  });
  return tags;
};
