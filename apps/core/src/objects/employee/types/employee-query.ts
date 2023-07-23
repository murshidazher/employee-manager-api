import { type Sort } from "src/types/common/sort";

import { type EmployeeSortByType } from "./sort-by";

export interface EmployeeQuery {
  ids?: readonly string[];
  emails?: readonly string[];
  genders?: readonly string[];
  sort?: Array<Sort<EmployeeSortByType>>;
}
