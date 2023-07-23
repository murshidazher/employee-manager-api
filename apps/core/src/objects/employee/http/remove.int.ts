import status from "http-status";

import api from "tests/api";
import { dropCollections } from "tests/factory/mongo/utils/helpers";
import Employee from "tests/helpers/employee.helper";

describe("objects.employee.http.remove()", () => {
  let employee: Employee;

  beforeAll(async () => {
    employee = await Employee.initialize({});
  });

  afterAll(async () => {
    dropCollections("employees");
  });

  describe("DELETE /", () => {
    it("should successfully remove the employee with the given id and return a 200 response", async () => {
      const response = await api.requestHttp(
        `/v1/employee/${employee.getId()?.toString()}`,
        "delete",
        {}
      );

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual({ deletedCount: 1 });
    });

    it("should return a 404 not found if the employee id is not given as params", async () => {
      const response = await api.requestHttp(`/v1/employee/`, "delete", {});

      expect(response.statusCode).toEqual(status.NOT_FOUND);
    });

    it("should return 0 with a 200 response if the employee id is not present in db", async () => {
      const response = await api.requestHttp(
        `/v1/employee/5ce77168bcc028f9613019ea`,
        "delete",
        {}
      );

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual({ deletedCount: 0 });
    });
  });
});
