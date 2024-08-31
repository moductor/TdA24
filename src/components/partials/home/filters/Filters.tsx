import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LecturerFilters } from "../../../../database/models/Lecturer";
import { delay } from "../../../../helpers/delay";
import FilterCategory from "./FilterCategory";
import FilterVariantOptions from "./variants/FilterVariantOptions";
import FilterVariantRange from "./variants/FilterVariantRange";

type Props = Readonly<{
  filters: LecturerFilters;
  onFiltered?: (filters: LecturerFilters) => void;
}>;

export default function Filters({ filters, onFiltered }: Props) {
  const limitPriceRange = filters.price.threshold;

  const [priceRange, setPriceRange] = useState(filters.price.value);
  const [locations, setLocations] = useState(filters.location);
  const [tags, setTags] = useState(filters.tags);

  useEffect(() => {
    delay("update filters", () => {
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

  const t = useTranslations("Filters");

  return (
    <>
      <FilterCategory title={t("price")} expanded={true}>
        <FilterVariantRange
          limits={limitPriceRange}
          onChange={(limits) => setPriceRange(limits)}
        />
      </FilterCategory>

      <FilterCategory title={t("location")} expanded={true}>
        <FilterVariantOptions
          items={locations}
          onChange={(items) => setLocations(items)}
        />
      </FilterCategory>

      <FilterCategory title={t("specialization")} expanded={true}>
        <FilterVariantOptions
          items={tags}
          onChange={(items) => setTags(items)}
        />
      </FilterCategory>
    </>
  );
}
