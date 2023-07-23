import {
  SortDirection,
  type Sort,
  type SortDirectionType,
} from "src/types/common/sort";

import {
  EmployeeSortBy,
  type EmployeeSortByType,
  type EmployeeSortOption,
} from "objects/employee/types";

const getSortMethod = (method: SortDirectionType): 1 | -1 =>
  method === SortDirection.ASC ? 1 : -1;

const getSortOption = (
  sorts: Array<Sort<EmployeeSortByType>>
): EmployeeSortOption => {
  const sortOptions: EmployeeSortOption = {};

  // maps sortBy options against mongodb field properties
  const sortByMap: Record<EmployeeSortByType, keyof EmployeeSortOption> = {
    [EmployeeSortBy.UPDATED_AT]: "updatedAt",
    [EmployeeSortBy.CREATED_AT]: "createdAt",
  };

  for (const sort of sorts) {
    sortOptions[sortByMap[sort.by]] = getSortMethod(sort.method);
  }

  return sortOptions;
};

export default getSortOption;
