import { useEffect, useState } from "react";
import { type Lecturer } from "../../../../database/models/Lecturer";
import FilterCategory from "./FilterCategory";
import FilterVariantOptions, {
  type Item as OptionsItem,
} from "./variants/FilterVariantOptions";
import type { PriceRange } from "./variants/FilterVariantRange";
import FilterVariantRange from "./variants/FilterVariantRange";

function getPriceRange(lecturers: Lecturer[]): PriceRange {
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
}

function getLocations(lecturers: Lecturer[]): OptionsItem[] {
  const locations: OptionsItem[] = [];
  lecturers
    .filter((lecturer) => lecturer.location)
    .forEach((lecturer) => {
      const foundItem = locations.find((e) => e.value == lecturer.location);
      if (foundItem) return;

      locations.push({
        value: lecturer.location as string,
        selected: false,
      });
    });
  return locations;
}

function getTags(lecturers: Lecturer[]): OptionsItem[] {
  const tags: OptionsItem[] = [];
  lecturers.forEach((lecturer) => {
    lecturer.tags?.forEach((tag) => {
      const foundItem = tags.find((e) => e.value == tag.name);
      if (foundItem) return;

      tags.push({ value: tag.name, selected: false });
    });
  });
  return tags;
}

type Props = Readonly<{
  lecturers: Lecturer[];
  onFiltered?: (filtered: Lecturer[]) => void;
}>;

let timeout: any;
function delay(cb: () => void, delay = 300) {
  clearTimeout(timeout);
  timeout = setTimeout(cb, delay);
}

export default function Filters({ lecturers, onFiltered }: Props) {
  const limitPriceRange = getPriceRange(lecturers);

  const [priceRange, setPriceRange] = useState(limitPriceRange);
  const [locations, setLocations] = useState(getLocations(lecturers));
  const [tags, setTags] = useState(getTags(lecturers));

  useEffect(() => {
    if (!onFiltered) return;
    onFiltered(filter());
  }, [priceRange, locations, tags]); // eslint-disable-line

  function filter(): Lecturer[] {
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

    return filtered;
  }

  return (
    <>
      <FilterCategory title="Cena" expanded={true}>
        <FilterVariantRange
          limits={limitPriceRange}
          onChange={(limits) => {
            delay(() => {
              setPriceRange(limits);
            });
          }}
        />
      </FilterCategory>

      <FilterCategory title="Lokace" expanded={true}>
        <FilterVariantOptions
          items={locations}
          onChange={(items) => {
            delay(() => {
              setLocations(items);
            });
          }}
        />
      </FilterCategory>

      <FilterCategory title="Zaměření" expanded={true}>
        <FilterVariantOptions
          items={tags}
          onChange={(items) => {
            delay(() => {
              setTags(items);
            });
          }}
        />
      </FilterCategory>
    </>
  );
}
