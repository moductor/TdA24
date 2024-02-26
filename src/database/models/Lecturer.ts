import { FilterOptions, FilterRange } from "../filters";
import { Tag, TagBase } from "../models/Tag";

export type ContactInfo = {
  telephone_numbers: string[];
  emails: string[];
};

export type LecturerBase = {
  title_before?: string | null;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  title_after?: string | null;
  picture_url?: string | null;
  location?: string | null;
  claim?: string | null;
  bio?: string | null;
  price_per_hour?: number | null;
  contact?: ContactInfo | null;
};

export type LecturerInput = LecturerBase & {
  tags?: TagBase[] | null;
};

export type Lecturer = LecturerBase & {
  uuid: string;
  contact: ContactInfo;
  tags?: Tag[] | null;
};

export function getNameString(lecturer: Lecturer) {
  const parts = [
    lecturer.title_before,
    lecturer.first_name,
    lecturer.middle_name,
    lecturer.last_name,
    lecturer.title_after,
  ].filter((part) => part != undefined);
  return parts.join(" ");
}

export type LecturerFilters = {
  price: FilterRange;
  location: FilterOptions;
  tags: FilterOptions;
};

export function getFilters(lecturers: Lecturer[]): LecturerFilters {
  return {
    price: getPriceRangeFilter(lecturers),
    location: getLocationFilter(lecturers),
    tags: getTagsFilter(lecturers),
  };
}

function getPriceRangeFilter(lecturers: Lecturer[]): FilterRange {
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

  return {
    threshold: { min: minPrice, max: maxPrice },
    value: { min: minPrice, max: maxPrice },
  };
}

function getLocationFilter(lecturers: Lecturer[]): FilterOptions {
  const locations: FilterOptions = [];
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

function getTagsFilter(lecturers: Lecturer[]): FilterOptions {
  const tags: FilterOptions = [];
  lecturers.forEach((lecturer) => {
    lecturer.tags?.forEach((tag) => {
      const foundItem = tags.find((e) => e.value == tag.name);
      if (foundItem) return;

      tags.push({ value: tag.name, selected: false });
    });
  });
  return tags;
}

export function filter(
  lecturers: Lecturer[],
  filters: LecturerFilters,
): Lecturer[] {
  let filtered = lecturers;

  // Filter price.

  filtered = filtered.filter((e) => {
    if (!e.price_per_hour) return true;
    return (
      e.price_per_hour >= filters.price.value.min &&
      e.price_per_hour <= filters.price.value.max
    );
  });

  // Filter locations.

  const selectedLocations = filters.location
    .filter((e) => e.selected)
    .map((e) => e.value);

  if (selectedLocations.length > 0) {
    filtered = filtered.filter((e) => {
      return e.location && selectedLocations.includes(e.location);
    });
  }

  // Filter tags.

  const selectedTags = filters.tags
    .filter((e) => e.selected)
    .map((e) => e.value);

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
