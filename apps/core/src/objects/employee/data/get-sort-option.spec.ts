import mockDate from "mockdate";

import { SortDirection } from "src/types/common/sort";

import { EmployeeSortBy } from "objects/employee/types";

import getSortOption from "./get-sort-option";

describe("objects.employee.data.getSortOption()", () => {
  const now = new Date("2021-10-12");

  beforeEach(() => {
    mockDate.set(now);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
  });

  it("returns an empty object when no sorting option is provided", () => {
    const result = getSortOption([]);

    expect(result).toEqual({});
  });

  it("returns the constructed sort query with createdAt as ASC", () => {
    const result = getSortOption([
      {
        by: EmployeeSortBy.CREATED_AT,
        method: SortDirection.ASC,
      },
    ]);

    expect(result).toEqual({ createdAt: 1 });
  });

  it("returns the constructed sort query with updatedAt as DESC", () => {
    const result = getSortOption([
      {
        by: EmployeeSortBy.UPDATED_AT,
        method: SortDirection.DESC,
      },
    ]);

    expect(result).toEqual({ updatedAt: -1 });
  });

  it("returns the constructed sort query with multiple sort options", () => {
    const result = getSortOption([
      {
        by: EmployeeSortBy.CREATED_AT,
        method: SortDirection.DESC,
      },
      {
        by: EmployeeSortBy.UPDATED_AT,
        method: SortDirection.ASC,
      },
    ]);

    expect(result).toEqual({ createdAt: -1, updatedAt: 1 });
  });
});
