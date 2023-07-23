import status from "http-status";

import api from "tests/api";
import { dropCollections } from "tests/factory/mongo/utils/helpers";
import Employee from "tests/helpers/employee.helper";

import { type RawEmployee } from "../types";

describe("objects.employee.http.add()", () => {
  let employee: Employee;

  beforeAll(async () => {
    employee = await Employee.initialize({});
  });

  afterAll(async () => {
    dropCollections("employees");
  });

  describe("GET /", () => {
    it("should get the employee with the given id and return a 200 response", async () => {
      const response = await api.requestHttp(`/v1/employee/`, "get", {
        ids: [employee.getId()?.toString()],
      });

      const { _id, createdAt, updatedAt, ...rest } =
        employee.getEmployee() as RawEmployee;

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual([
        expect.objectContaining({
          id: _id.toString(),
          ...rest,
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
        }),
      ]);
    });

    it("should return an empty array with a 200 response if the employee id is not present", async () => {
      const response = await api.requestHttp(`/v1/employee`, "get", {
        ids: ["5ce77168bcc028f9613019ea"],
      });

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual([]);
    });
  });
});
