import mockDate from "mockdate";
import { ObjectId } from "mongodb";

import { type RawEmployee } from "src/objects/employee/types";

import convert from "./convert";

describe("objects.employee.data.convert()", () => {
  const now = new Date("2021-10-12");
  const fakeObjectId = new ObjectId("5ce77168bcc028f9613019ea");

  let source: RawEmployee;

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

    source = {
      _id: fakeObjectId,
      ...commonAttributes,
      createdAt: now,
      updatedAt: now,
    };
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
  });

  it("returns the expected converted employee object", () => {
    const result = convert(source);

    const { _id, ...rest } = source;
    expect(result).toEqual({
      id: fakeObjectId.toString(),
      ...rest,
    });
  });
});
