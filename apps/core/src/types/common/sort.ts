export const SORT_DIRECTION = ["ASC", "DESC"] as const;

export type SortDirectionType = (typeof SORT_DIRECTION)[number];

export const SortDirection: {
  [key in SortDirectionType]: key;
} = Object.assign(
  {},
  ...SORT_DIRECTION.map((direction: SortDirectionType) => ({
    [direction]: `${direction}`,
  }))
);

export interface Sort<T> {
  by: T;
  method: SortDirectionType;
}
