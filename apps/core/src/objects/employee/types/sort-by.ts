export const EMPLOYEE_SORT_BY = ["UPDATED_AT", "CREATED_AT"] as const;

export type EmployeeSortByType = (typeof EMPLOYEE_SORT_BY)[number];

export const EmployeeSortBy: {
  [key in EmployeeSortByType]: key;
} = Object.assign(
  {},
  ...EMPLOYEE_SORT_BY.map((sortBy: EmployeeSortByType) => ({
    [sortBy]: `${sortBy}`,
  }))
);
