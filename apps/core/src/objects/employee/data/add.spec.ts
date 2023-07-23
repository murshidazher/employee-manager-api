import mockDate from "mockdate";
import * as mongodb from "mongodb";

import { findOne, insertOne } from "src/__mocks__/mongo";

import { type Employee, type RawEmployee } from "../types";
import add from "./add";

describe("objects.employee.data.add()", () => {
  const now = new Date("2021-10-12");
  const fakeObjectId = new mongodb.ObjectId("5ce77168bcc028f9613019ea");

  let rawEmployee: RawEmployee;
  let employee: Employee;

  const commonAttributes = {
    firstName: "Henri",
    lastName: "Rodriguez",
    email: "Darrin_Rippin@gmail.com",
    number: "+94771277218",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/92.jpg",
  };

  beforeEach(() => {
    mockDate.set(now);

    rawEmployee = {
      _id: fakeObjectId,
      ...commonAttributes,
      createdAt: now,
      updatedAt: now,
    };

    employee = {
      id: fakeObjectId.toString(),
      ...commonAttributes,
      createdAt: now,
      updatedAt: now,
    };

    // mock db
    insertOne.mockResolvedValue({
      insertedId: fakeObjectId,
    });
    findOne.mockResolvedValue(rawEmployee);

    // mock ObjectId
    jest.spyOn(mongodb, "ObjectId").mockImplementation((inputId?: any): any => {
      if (!inputId) return fakeObjectId;
      return inputId;
    });

    // mock random number generation
    jest.spyOn(Math, "random").mockReturnValue(0.92);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
  });

  it("add the employee", async () => {
    const { photo, ...rest } = commonAttributes;

    const result = await add(rest);

    expect(insertOne).toHaveBeenCalledTimes(1);
    expect(insertOne).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining(commonAttributes)
    );
    expect(findOne).toHaveBeenCalledTimes(1);
    expect(findOne).toHaveBeenNthCalledWith(1, { _id: fakeObjectId });
    expect(result).toEqual(employee);
  });
});
