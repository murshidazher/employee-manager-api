import mockDate from "mockdate";
import { ObjectId } from "mongodb";

import { type EmployeeQuery } from "objects/employee/types";

import getMongoQuery from "./get-mongo-query";

describe("objects.employee.data.getMongoQuery()", () => {
  const now = new Date("2021-10-12");
  const fakeObjectId = new ObjectId("5ce77168bcc028f9613019ea");

  let args: EmployeeQuery;

  beforeEach(() => {
    mockDate.set(now);

    args = {
      ids: [fakeObjectId.toString()],
    };
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
  });

  it("returns the constructed mongo query with mongodb id", async () => {
    const result = await getMongoQuery(args);

    expect(result).toEqual({
      _id: { $in: [fakeObjectId] },
    });
  });
});
