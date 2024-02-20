import { useEffect, useState } from "react";
import { LecturerFilters } from "../../../../database/models/Lecturer";
import FilterCategory from "./FilterCategory";
import FilterVariantOptions from "./variants/FilterVariantOptions";
import FilterVariantRange from "./variants/FilterVariantRange";

type Props = Readonly<{
  filters: LecturerFilters;
  onFiltered?: (filters: LecturerFilters) => void;
}>;

let timeout: any;
function delay(cb: () => void, delay = 300) {
  clearTimeout(timeout);
  timeout = setTimeout(cb, delay);
}

export default function Filters({ filters, onFiltered }: Props) {
  const limitPriceRange = filters.price.threshold;

  const [priceRange, setPriceRange] = useState(filters.price.value);
  const [locations, setLocations] = useState(filters.location);
  const [tags, setTags] = useState(filters.tags);

  useEffect(() => {
    delay(() => {
      if (!onFiltered) return;
      onFiltered({
        price: {
          threshold: limitPriceRange,
          value: priceRange,
        },
        location: locations,
        tags: tags,
      });
    });
  }, [priceRange, locations, tags]); // eslint-disable-line

  return (
    <>
      <FilterCategory title="Cena" expanded={true}>
        <FilterVariantRange
          limits={limitPriceRange}
          onChange={(limits) => setPriceRange(limits)}
        />
      </FilterCategory>

      <FilterCategory title="Lokace" expanded={true}>
        <FilterVariantOptions
          items={locations}
          onChange={(items) => setLocations(items)}
        />
      </FilterCategory>

      <FilterCategory title="Zaměření" expanded={true}>
        <FilterVariantOptions
          items={tags}
          onChange={(items) => setTags(items)}
        />
      </FilterCategory>
    </>
  );
}
