import { findOne } from 'src/__mocks__/mongo';
import status from "http-status";

import api from "tests/api";
import { dropCollections } from "tests/factory/mongo/utils/helpers";
import Employee from "tests/helpers/employee.helper";
import { RawEmployee } from "../types";
import dbs from "core/dbs";

describe("objects.employee.http.update()", () => {
  let employee: Employee;

  beforeAll(async () => {
    employee = await Employee.initialize({});
  });

  afterAll(async () => {
    dropCollections("employees");
  });

  describe("PUT /", () => {
    it("should successfully modify the employee record with the given id and payload", async () => {
      const response = await api.requestHttp(
        `/v1/employee/${employee.getId()?.toString()}`,
        "put",
        {
          firstName: "John"
        }
      );

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual({ modifiedCount: 1 });

      // check the db record
      const rawEmployee = await dbs.mongo.db
        .collection<RawEmployee>("employees")
        .findOne({
          _id: employee.getId()
        });

      const prevEmployeeRecord =
        employee.getEmployee() as RawEmployee;

      expect(rawEmployee).toEqual(
        expect.objectContaining({
          ...prevEmployeeRecord,
          firstName: "John",
          updatedAt: rawEmployee?.updatedAt,
        }))
    });

    it("should return a 404 not found if the employee id is not given as params", async () => {
      const response = await api.requestHttp(`/v1/employee/`, "put", {});

      expect(response.statusCode).toEqual(status.NOT_FOUND);
    });

    it("should return 0 with a 200 response if the employee id is not present in db", async () => {
      const response = await api.requestHttp(
        `/v1/employee/5ce77168bcc028f9613019ea`,
        "put",
        {}
      );

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual({ modifiedCount: 0 });
    });
  });
});
