import type { Lecturer } from "../../../../models/Lecturer";
import type { PriceRange } from "./variants/FilterVariantRange.tsx";

import FilterCategory from "./FilterCategory.tsx";
import FilterVariantOptions, {
  type Item as OptionsItem,
} from "./variants/FilterVariantOptions.tsx";
import FilterVariantRange from "./variants/FilterVariantRange.tsx";

export interface WindowExtension extends Window {
  reloadLecturers?: (filteredIDs: string[]) => void;
}
declare let window: WindowExtension;

const loadLecturers = () => {
  const dataElement = document.getElementById("lecturersData") as HTMLElement;
  const dataString = dataElement.innerHTML;
  const data = JSON.parse(dataString) as Lecturer[];
  return data;
};

const getPriceRange = (lecturers: Lecturer[]): PriceRange => {
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

const lecturers = loadLecturers();
const limitPriceRange = getPriceRange(lecturers);

let priceRange = limitPriceRange;
let locations = getLocations(lecturers);
let tags = getTags(lecturers);

export default () => {
  return (
    <>
      <FilterCategory title="Cena" expanded={true}>
        <FilterVariantRange
          limits={limitPriceRange}
          onChange={(limits) => {
            priceRange = limits;
            filter();
          }}
        />
      </FilterCategory>

      <FilterCategory title="Lokace" expanded={true}>
        <FilterVariantOptions
          items={locations}
          onChange={(items) => {
            locations = items;
            filter();
          }}
        />
      </FilterCategory>

      <FilterCategory title="Zaměření">
        <FilterVariantOptions
          items={tags}
          onChange={(items) => {
            tags = items;
            filter();
          }}
        />
      </FilterCategory>
    </>
  );
};

const filter = () => {
  if (!window.reloadLecturers) return;

  let filtered = lecturers;

  // Filter price.

  filtered = filtered.filter((e) => {
    if (!e.price_per_hour) return true;
    return (
      e.price_per_hour >= priceRange.min && e.price_per_hour <= priceRange.max
    );
  });

  // Filter locations.

  const selectedLocations = locations
    .filter((e) => e.selected)
    .map((e) => e.value);

  if (selectedLocations.length > 0) {
    filtered = filtered.filter((e) => {
      return e.location && selectedLocations.includes(e.location);
    });
  }

  // Filter tags.

  const selectedTags = tags.filter((e) => e.selected).map((e) => e.value);

  if (selectedTags.length > 0) {
    filtered = filtered.filter((e) => {
      const tags = e.tags?.map((e) => e.name);
      if (!tags) return false;
      for (const tag of selectedTags) {
        if (!tags.includes(tag)) return false;
      }
      return true;
    });
  }

  window.reloadLecturers(filtered.map((e) => e.uuid));
};
