// Range.

export type FilterRange = {
  threshold: FilterRangeValue;
  value: FilterRangeValue;
};

export type FilterRangeValue = {
  min: number;
  max: number;
};

// Options list.

export type FilterOptions = FilterOptionsItem[];

export type FilterOptionsItem = {
  value: string;
  selected: boolean;
};
